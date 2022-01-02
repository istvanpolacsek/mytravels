import Head from 'next/head';
import Script from 'next/script';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import 'css/styles.css';

import ContextWrapper from 'components/ContextWrapper/ContextWrapper';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';
import ActiveDialog from 'components/ActiveDialog/ActiveDialog';

const clientSideEmotionCache = createCache({ key: 'css' });

function App({ Component, emotionCache = clientSideEmotionCache, pageProps, session }) {
  return (
    <>
      <Head>
        <title>My Travels</title>
        <meta name="viewport" content="initial-scale=1, width=device-width, user-scalable=no, viewport-fit=cover" />
      </Head>
      <Script async id="google-maps" strategy="afterInteractive" src={process.env.NEXT_PUBLIC_MAPS_SRC} />
      <ContextWrapper emotionCache={emotionCache} session={session}>
        <CssBaseline />
        <GlobalLoader />
        <ActiveDialog />
        <Component {...pageProps} />
      </ContextWrapper>
    </>
  );
}

export default App;
