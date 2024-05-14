<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">

    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')

const updateApp = () => {
	const data: any = {
		// 版本更新内容 支持<br>自动换行
		describe: '1. 修复已知问题<br>2. 优化用户体验', 
		edition_url: '', //apk、wgt包下载地址或者应用市场地址  安卓应用市场 market://details?id=xxxx 苹果store itms-apps://itunes.apple.com/cn/app/xxxxxx
		edition_force: 0, //是否强制更新 0代表否 1代表是
		package_type: 0, //0是整包升级（apk或者appstore或者安卓应用市场） 1是wgt升级
		edition_issue: 1, //是否发行  0否 1是 为了控制上架应用市场审核时不能弹出热更新框
		edition_number: 101, //版本号 最重要的manifest里的版本号 （检查更新主要以服务器返回的edition_number版本号是否大于当前app的版本号来实现是否更新）
		edition_name:'1.0.1',// 版本名称 manifest里的版本名称
		edition_silence: 0, // 是否静默更新 0代表否 1代表是
	}
	uni.navigateTo({
	  url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' + JSON.stringify(data)
	});
}

updateApp()
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
	width: 100%;
	text-wrap: wrap;
  font-size: 20rpx;
  color: #8f8f94;
}
</style>
