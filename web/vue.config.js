const path = require('path')

const TerserPlugin = require('terser-webpack-plugin');


const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
  lintOnSave: false,
  outputDir: __dirname + '/../serve/web',
  // publicPath: process.env.NODE_ENV === 'production' ? '/web' : '/'

  productionSourceMap: false,
  chainWebpack: config => {
    //最小化代码
    config.optimization.minimize(true);
    //分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    });
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
        },
        plugins: [
          // new PrerenderSPAPlugin({
          //   staticDir: path.join(__dirname, '/../serve/web'),
          //   routes: ['/', '/blogs'],
          //   // renderer: new Renderer({
          //   //   inject: {
          //   //     foo: 'bar'
          //   //   },
          //   //   headless: true,
          //   //   renderAfterDocumentEvent: 'render-event'
          //   // })
          // }),
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
            threshold: 1024,
            minRatio: 0.8,
          }),
          // new CompressionWebpackPlugin({
          //   filename: info => {
          //     return `${info.path}.gz${info.query}`
          //   },
          //   algorithm: 'gzip',
          //   test: /\.js$|\.json$|\.css/,
          //   threshold: 10240, // 只有大小大于该值的资源会被处理
          //   minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
          //   deleteOriginalAssets: true // 删除原文件
          // })     
        ]
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  // devServer: {
  //   //在本地服务器开启gzip，线上服务器都支持gzip不需要设置
  //   before(app) {
  //       app.get(/.*.(js)$/, (req, res, next) => {
  //           req.url = req.url + '.gz';
  //           res.set('Content-Encoding', 'gzip');
  //           next();
  //       })
  //   }
  // }
}