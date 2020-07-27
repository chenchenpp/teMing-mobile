const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const server = {
  target: 'http://172.16.16.8', // .8开发环境  .11 测试环境
  secure: false
};
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/sass/variable.scss";'
      },
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  devServer: {
    proxy: {
      '/user_api': {
        target: server.target,
        changeOrigin: true,
        secure: server.secure
      }
    }
  },

  configureWebpack: config => {
    Object.assign(config, {
      resolve: {
        extensions: ["css", ".js", ".vue", ".less"],
        alias: {
          "@": resolve("./src"),
          assets: resolve("./src/assets"),
          pages: resolve("./src/pages"),
          components: resolve("./src/components")
        }
      }
    });
    // 生产模式
    if (process.env.NODE_ENV === 'production') {
      // 打包生产.gz包
      return {
        plugins: [new CompressionPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })]
      };
    };
    config.plugins.push(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')]
    }));
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
};
