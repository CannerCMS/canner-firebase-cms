import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => {
      return sheet.collectStyles(<App {...props} />)
    })
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <meta name="description" content="Canner CMS demo with Firebase" />
          <meta charSet="utf-8"/>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
          <link rel="stylesheet" type="text/css" href="https://cdn.canner.io/antd/3.10.1/antd.min.css"/>
          <link rel='stylesheet' href='/_next/static/style.css' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
