const IS_PROD = ['production'].includes(process.env.NODE_ENV);
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
];

// 去除 console.log
if (IS_PROD) {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
};
