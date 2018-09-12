module.exports = {
  baseUrl: './',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/stylesheets/mixins.scss";'
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
         {
           test: /(pdfkit|linebreak|fontkit|unicode|brotli|png-js).*\.js$/,
           loader: 'transform-loader?brfs',
         },
         {
           test: /\.pdf$/,
           loader: 'url-loader',
         }
      ]
    }
  }
}
