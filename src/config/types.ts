export interface Config {
	// 接口主域名
	base: string;
	// 项目代号
	project: string;
	// 接口前缀
	prefix: Record<string, string>;
	// 下载接口
	downloadUrl: string;
	// 上传接口
	uploadUrl: string;
}