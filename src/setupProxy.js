const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://3.83.142.57:5000",
            changeOrigin: true,
        })
    )
}