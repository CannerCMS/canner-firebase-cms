// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-dashboard-js": () => import("/Users/siou/projects/canner-firebase-cms/src/pages/dashboard.js" /* webpackChunkName: "component---src-pages-dashboard-js" */),
  "component---cache-dev-404-page-js": () => import("/Users/siou/projects/canner-firebase-cms/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-index-js": () => import("/Users/siou/projects/canner-firebase-cms/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-login-js": () => import("/Users/siou/projects/canner-firebase-cms/src/pages/login.js" /* webpackChunkName: "component---src-pages-login-js" */)
}

exports.data = () => import("/Users/siou/projects/canner-firebase-cms/.cache/data.json")

