/**
 * 吐司弹窗错误
 * @param title 标题
 * @param duration 过渡时间 (默认3s)
 */
const toastErr = (title: string, duration = 3000) => {
  uni.showToast({
    title,
    icon: "none",
    duration
  })
}

export default {
	toastErr
}
