import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      {/* <link rel="stylesheet" type="text/css" href="/static/Draft.css" /> */}
      <title>Berman Announcements</title>
    </Head>
  )
}

export default Meta
