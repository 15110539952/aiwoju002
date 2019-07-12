const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
      .set('utils', resolve('src/utils'))
      .set('static', resolve('static'))
      .set('api', resolve('src/api'))
  },
  devServer: {
    proxy: {
      '/lawqa': {
        target: 'http://xiaofa.aegis-info.com/ ',
        changeOrigin: true,
        pathRewrite: {
          '^/lawqa': 'api/'
        }
      },
    },
    overlay: {
      warnings: false,
      errors: false
    },
  },
  runtimeCompiler: false,
};
