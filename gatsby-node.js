exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-import',
    options: {
      libraryName: 'antd',
      style: true
    }
  })
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.merge({
    resolve: {
      alias: {
        'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
      }
    }
  });

  return config;
};
