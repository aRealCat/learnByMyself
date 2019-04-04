module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.48.64:3000/',
        ws: true,
        changeOrigin: true
      },
       '/chat': {
        target: 'http://192.168.48.64:3001/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}