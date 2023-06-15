import path from 'path';

const outputRootStrtegy = {
  weapp: 'dist_weapp',
  tt: 'dist_tt',
  ['undefined']: 'dist'
}
const outputRoot = outputRootStrtegy[process.env.TARO_ENV]

const config = {
  projectName: 'taro-demo',
  date: '2023-6-14',
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  designWidth: 375,
  deviceRatio: {
    375: 2,
    750: 1,
  },
  sourceRoot: 'src',
  outputRoot: outputRoot,
  plugins: [
    ['@tarojs/plugin-inject', {
      nestElements: {
        'static-text': 15,
      },
    }]
  ],
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    'taro-ui$': 'taro-ui/lib/index',
    'react-query': 'react-query/dist/react-query.production.min',
    axios: 'taro-axios/lib/index.esm.js',
  },
  defineConstants: {},
  copy: {
    patterns: [
      {
        from: './ext.json',
        to: 'dist_weapp/',
      },
    ],
    options: {},
  },
  framework: 'react',
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    optimizeMainPackage: {
      enable: true
    },
    baseLevel: 30,
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      'postcss-px-scale': {
        enable: true,
        config: {
          scale: 0.5, // 缩放为 1/2
          units: 'rpx',
          includes: ['taro-ui'],
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui', 'taro-skeleton'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      'postcss-px-scale': {
        enable: true,
        config: {
          scale: 0.5, // 缩放为 1/2
          units: 'rem',
          includes: ['taro-ui'],
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  } else if (process.env.NODE_ENV === 'gray') {
    return merge({}, config, require('./gray'));
  }
  return merge({}, config, require('./prod'));
};
