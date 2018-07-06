const pkg = require("./package.json");
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const path = require("path");
const theme = pkg.theme;

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

// antd + nextjs
// https://github.com/zeit/next.js/tree/canary/examples/with-ant-design
module.exports = withCss(withLess({
  lessLoaderOptions: {
    modifyVars: theme
  },
  webpack: (config, {}) => {
    config.resolve.alias["styled-components"] = path.resolve(__dirname, 'node_modules', 'styled-components');

    // with antd example using next.js
    // https://github.com/zeit/next.js/tree/canary/examples/with-ant-design
    config.module.rules.push(
      // loader for canner.schema.js
      {
        test: /\.schema\.js|canner\.def\.js$/,
        use: [
          {loader: 'canner-schema-loader'},
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'next/babel'
              ]
            }
          }
        ]
      }
    );
    return config;
  },
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/dashboard/*': { page: '/dashboard'}
    }
  }
}))



