import { createSSRApp } from "vue";
import App from "./App.vue";

import "@/styles/index.scss"

// 全局插件
import global from "./global";

export function createApp() {
  const app = createSSRApp(App);
  // 使用全局插件
  app.use(global)
  return {
    app,
  };
}
