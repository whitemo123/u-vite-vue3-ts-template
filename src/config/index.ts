import dev from './dev'
import test from './test'
import prod from './prod'

import type { Config } from './types';

let config: Config;

// #ifdef APP || H5
// APP端和H5端
const env = import.meta.env;
if (env.MODE === 'production') {
	// 生产
	config = prod
} else {
	// 开发
	config = dev
}
// #endif

// #ifdef MP-WEIXIN
// 微信小程序
const plat = uni.getAccountInfoSync().miniProgram.envVersion;
if(plat === "release") {
  config = prod
} else if(plat === "trial") {
  config = test
} else {
  config = dev
}
// #endif

export default config
