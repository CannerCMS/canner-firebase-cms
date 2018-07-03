const path = require('path');

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-import',
    options: {
      libraryName: 'antd',
      style: true
    }
  })
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  ["pages", "posts", "category"].forEach((key) => {
    createPage({
      path: `dashboard/${key}`,
      component: path.resolve('./src/pages/dashboard.js')
    })
  })
};

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
