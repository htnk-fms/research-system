module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath:process.env.NODE_ENV === 'production'
    ? '/research'
    : '/'
    ,
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  }
}
