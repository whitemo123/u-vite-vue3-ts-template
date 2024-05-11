import config from '@/config'
import storage from './storage'

const key = `${config.project}-u-token`

/**
 * 存储token
 * @param {string} token token
 */
export const setToken = (token: string) => {
	storage.setData(key, token)
}

/**
 * 获取token
 */
export const getToken = () => {
	return storage.getData(key)
}

/**
 * 删除token
 */
export const delToken = () => {
	storage.delData(key)
}

export default {
	setToken,
	getToken,
	delToken
}
