module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: ' http://192.168.48.65:3000/',
        ws: true,
        changeOrigin: true
      },
       '/chat': {
        target: ' http://192.168.48.65:3001/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}