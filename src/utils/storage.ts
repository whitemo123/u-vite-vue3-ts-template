/**
 * 存储数据
 * @param key 键
 * @param value 值
 */
const setData = (key: string, value: any) => {
  uni.setStorageSync(key, value)
}

/**
 * 删除数据
 * @param key 键
 */
const delData = (key: string) => {
  uni.removeStorageSync(key)
}

/**
 * 获取数据
 * @param key 键
 */
const getData = (key: string) => {
  return uni.getStorageSync(key)
}

export default {
  setData,
  getData,
  delData
}
