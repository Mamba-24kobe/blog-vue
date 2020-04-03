module.exports = {
    lintOnSave: false,
    outputDir: __dirname + '/../serve/admin',
    publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/'
}