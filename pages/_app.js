import Head from 'next/head';
import Script from 'next/script';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';

import ContextWrapper from 'components/ContextWrapper/ContextWrapper';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';

const clientSideEmotionCache = createCache({ key: 'css' });

function App({ Component, emotionCache = clientSideEmotionCache, pageProps, session, isMobile = true, ...rest }) {
  return (
    <>
      <Head><title>My Travels</title></Head>
      <Script async id="google-maps" strategy="afterInteractive" src={process.env.NEXT_PUBLIC_MAPS_SRC} />
      <ContextWrapper emotionCache={emotionCache} session={session}>
        <CssBaseline />
        <GlobalLoader />
        <Component {...pageProps} />
      </ContextWrapper>
    </>
  );
}

export default App;
