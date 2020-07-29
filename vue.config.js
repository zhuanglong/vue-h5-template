const path = require('path');
const defaultSettings = require('./src/config/index.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ['production'].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: './', // 部署应用包时的基本 URL。hash 模式使用
  // publicPath: '/app/', // 部署应用包时的基本 URL。history 模式使用
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // outputDir 的静态资源
  lintOnSave: true, // 是否每次保存都启用 eslint 验证
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设为 false 以加速生成环境构建
  devServer: {
    port: 8020,
    open: false,
    overlay: {
      // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
  },

  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中(而不是动态注入到 JS 中的 inLine 代码)
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局 sass 样式传入共享的全局变量, $cdn 可以配置图片 cdn 前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "src/assets/css/mixin.scss";
          @import "src/assets/css/variables.scss";
          $cdn: "${defaultSettings.$cdn}";
          `
      }
    }
  },

  configureWebpack: config => {
    // 页面标题
    config.name = defaultSettings.title;
  },

  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    // 别名
    config.resolve.alias.set('@', resolve('src'));
    // 或者这样
    // config.resolve.alias = {
    //   '@': resolve('src')
    // };

    // 设置保留空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
          openAnalyzer: false // 是否自动打开
        }
      ]);
    }

    // https://webpack.js.org/configuration/devtool/#development
    config.when(!IS_PROD, config => config.devtool('cheap-source-map'));

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end();

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以配置多个组，每个组根据 test 设置条件，符合 test 条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, // 被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk, 如果为 true 则表示当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重最高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      });

      config.optimization.runtimeChunk('single');
    });
  }
};
