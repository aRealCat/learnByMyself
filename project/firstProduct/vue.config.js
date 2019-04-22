module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    // baseUrl: '/',
    devServer: {
        proxy: {
            '/site': {
                target: 'https://f1.hiram.cn',
                changeOrigin: false,
                ws: true
            },
            '/order': {
                target: 'https://f1.hiram.cn/order2',
                changeOrigin: false,
                ws: true
            }
        }
    }
}
// .env.development
// VUE_APP_BASE_API=/api