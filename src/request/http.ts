import { useUserStore } from "@/store/user";
import common from "@/utils/common";

import Md5 from 'js-md5'

interface IRequestTreeItem {
	// 请求地址
	url : string;
	// 请求方法
	method : string;
	// 请求数据
	data : string;
}

interface AnyObject {
	[key : string] : any;
}

export default class Http {
	// 请求前缀
	private prefix : string = '';

	// 请求池
	private requestTree : Record<string, IRequestTreeItem> = {}

	constructor(apiPrefix : string) {
		this.prefix = apiPrefix;
	}

	/**
	 * 验证request是否存在
	 * @param url 请求地址
	 * @param method 请求方法
	 * @param data 请求数据
	 */
	validRequestExit(url : string, method : string, data : string) : boolean {
		const key : string = Md5(url + method + (data || ''));
		if (this.requestTree[key]) {
			return true
		}
		return false
	}

	/**
	 * 获取请求数对象
	 * @param url 请求地址
	 * @param type 请求类型
	 * @param data 请求数据
	 * @returns
	 */
	getRequestItemData(url : string, type : string, data : any) {
		const requestUrl = url;
		const requestMethod = type;
		let requestData = '';
		try {
			requestData = JSON.stringify(data);
		} catch (e) {
			requestData = data
		}
		return {
			requestUrl,
			requestMethod,
			requestData
		}
	}

	/**
	 * 删除堆栈中的request
	 * @param url 请求地址
	 * @param method 请求方法
	 * @param data 请求数据
	 */
	removeRequestTreeItem = (url : string, method : string, data : string) => {
		const key : string = Md5(url + method + (data || ''));
		delete this.requestTree[key]
	}

	/**
	 * 创建request请求
	 * @param url 请求接口
	 * @param type 请求方法
	 * @param data 请求数据
	 * @param header 请求头
	 * @returns
	 */
	request<T = any>(
		url : string,
		type : 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
		data : AnyObject,
		header : any
	) : Promise<T> {
		// 拼接url
		let apiUrl = this.prefix + url

		const userStore = useUserStore()
		// 全局添加请求头
		let obj = {
			'Authorization': 'Bearer ' + userStore.token,
		}
		if (header) {
			let headers = Object.assign(header, obj);
			header = headers;
		} else {
			header = obj
		}
		if (data) {
			// 清除无用参数
			Object.keys(data).forEach(key => {
				if (data[key] == null || data[key] == undefined || data[key] === '') {
					delete (data[key]);
				}
			})
		}

		// ======== 防重复提交 =======
		const { requestUrl, requestMethod, requestData } = this.getRequestItemData(apiUrl, type, data)
		if (!this.validRequestExit(requestUrl, requestMethod, requestData)) {
			const key : string = Md5(requestUrl + requestMethod + (requestData || ''));
			this.requestTree[key] = {
				url: requestUrl,
				method: requestMethod,
				data: requestData
			}
		} else {
			// @ts-ignore
			return;
		}
		// =========================

		return new Promise((resolve, reject) => {
			let that = this;
			uni.request({
				url: apiUrl,
				method: type,
				data,
				header,
				success(res) {
					that.removeRequestTreeItem(requestUrl, requestMethod, requestData)
					if (res.statusCode == 200) {
						const data : any = res.data;
						if (data.code == 0) {
							// 正常抛出数据
							resolve(data.data as T)
						} else {
							if (data.code == 401) {
								// 未登录
								let pageUrl = "/pages_my/pages/login/login"
								uni.redirectTo({
									url: pageUrl
								})
								uni.hideLoading();
								return reject(data);
							}
							// 错误数据
							uni.hideLoading();
							common.toastErr(data.message || "网络请求异常")
							reject(data);
						}
					} else {
						console.log(data)
						uni.hideLoading();
						common.toastErr("网络请求异常")
						reject(data)
					}
				},
				fail(err) {
					that.removeRequestTreeItem(requestUrl, requestMethod, requestData)
					uni.hideLoading();
					common.toastErr("网络请求异常")
					reject(err)
				}
			})
		})
	}

	/**
	 * http get请求
	 * @param url 请求url
	 * @param data 请求数据
	 * @returns
	 */
	get<T = any>(
		url : string,
		data : AnyObject
	) : Promise<T> {
		return this.request(url, 'GET', data, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	}

	/**
	 * http post json请求
	 * @param url 请求url
	 * @param data 请求数据
	 * @returns
	 */
	postJ<T = any>(
		url : string,
		data : AnyObject
	) : Promise<T> {
		return this.request(url, 'POST', data, {
			'Content-Type': 'application/json'
		})
	}

	/**
	 * http post x-www-form-urlencoded请求
	 * @param url 请求url
	 * @param data 请求数据
	 * @returns
	 */
	postW<T = any>(
		url : string,
		data : AnyObject
	) : Promise<T> {
		return this.request(url, 'POST', data, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	}

	/**
	 * http put json请求
	 * @param url 请求接口
	 * @param data 请求参数
	 * @returns
	 */
	putJ<T = any>(
		url : string,
		data : AnyObject
	) : Promise<T> {
		return this.request(url, 'PUT', data, {
			'Content-Type': 'application/json'
		})
	}

	/**
	 * http put x-www-form-urlencoded请求
	 * @param url 请求接口
	 * @param data 请求参数
	 * @returns
	 */
	putW<T = any>(
		url : string,
		data : AnyObject
	) : Promise<T> {
		return this.request(url, 'PUT', data, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	}

	/**
	 * http delete请求
	 * @param url 请求接口
	 * @param data 请求参数
	 * @returns
	 */
	del<T = any>(
		url : string,
		data : AnyObject
	) : Promise<T> {
		return this.request(url, 'DELETE', data, {})
	}
}