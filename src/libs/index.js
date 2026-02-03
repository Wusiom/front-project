import { defineAsyncComponent } from 'vue'
export default {
  install(app) {
    // 获取当前路径任意文件夹的index.vue文件
    const files = import.meta.glob('./*/index.vue')
    Object.keys(files).forEach(path => {
      const component = files[path]
      console.log(path);
      const componentName = 'm-' + path.replace('./', '').split('/')[0]
      app.component(componentName, defineAsyncComponent(component))
    })
  }
}
