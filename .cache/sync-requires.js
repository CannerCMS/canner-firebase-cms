// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-dashboard-js": preferDefault(require("/Users/siou/projects/canner-firebase-cms/src/pages/dashboard.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/siou/projects/canner-firebase-cms/.cache/dev-404-page.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/siou/projects/canner-firebase-cms/src/pages/index.js")),
  "component---src-pages-login-js": preferDefault(require("/Users/siou/projects/canner-firebase-cms/src/pages/login.js"))
}

