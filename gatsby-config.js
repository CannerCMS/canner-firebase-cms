const tsImportPluginFactory = require('ts-import-plugin');
const pkg = require("./package.json");
const theme = pkg.theme;

module.exports = {
  siteMetadata: {
    siteName: `Canner ❤️ Firebase demo`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'antd',
              style: true
            })
          ]
        }),
        compilerOptions: {
          module: 'es2015'
        }
      }
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        modifyVars: theme
      },
    },
    `gatsby-plugin-react-helmet`
  ]
}
