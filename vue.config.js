module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath:process.env.NODE_ENV === 'production'
    ? '/reserch'
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
