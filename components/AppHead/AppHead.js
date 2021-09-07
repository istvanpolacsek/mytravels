import Head from 'next/head';

const AppHead = () => {
  return(
    <Head>
      <title>My Travels</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="My Travels" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black"
      />
    </Head>
  )
}

export default AppHead;
