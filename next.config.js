const pkg = require("./package.json");
const withLess = require('@zeit/next-less')
const path = require("path");
const theme = pkg.theme;

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLess({
  lessLoaderOptions: {
    modifyVars: theme
  },
  webpack: (config, {}) => {
    // with antd example using next.js
    // https://github.com/zeit/next.js/tree/canary/examples/with-ant-design
    config.module.rules.push(
      // loader for canner.schema.js
      {
        test: /\.schema\.js|canner\.def\.js$/,
        use: [
          {loader: 'canner-schema-loader'},
          {loader: 'babel-loader'}
        ]
      }
    );
    return config;
  }
})



