// 注入store
import store from '@/store'

import type { App } from 'vue'

export default (app: App) => {
  // store
  app.use(store)
}
