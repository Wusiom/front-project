export default {
  install(app) {
    const modules = import.meta.glob('./modules/*.js', { eager: true })
    Object.entries(modules).forEach(([path, mod]) => {
      const name = path.replace('./modules/', '').replace('.js', '')
      app.directive(name, mod.default)
    })
  }
}