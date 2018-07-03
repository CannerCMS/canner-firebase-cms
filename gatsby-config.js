const pkg = require("./package.json");
const theme = pkg.theme;

module.exports = {
  siteMetadata: {
    siteName: `Canner ❤️ Firebase demo`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: theme
      },
    },
    `gatsby-plugin-canner-schema`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`
  ]
}
