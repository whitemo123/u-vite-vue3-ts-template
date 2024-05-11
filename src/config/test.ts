import type { Config } from './types'

const test: Config = {
	// #ifdef H5
	base: "",
	// #endif
	// #ifndef H5
	// @ts-ignore
	base: "http://192.168.1.44:1400",
	// #endif
	prefix: {
		"http": "/api"
	},
	// 项目代号
	project: '',
	// 资源下载地址
	downloadUrl: "",
	// 上传接口地址
	uploadUrl: ""
}

test.downloadUrl = test.base + test.prefix.http + '/party/oss/download'
test.uploadUrl = test.base + test.prefix.http + '/party/oss/burstUpload'

export default test
