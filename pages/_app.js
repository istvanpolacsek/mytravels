import Head from 'next/head';
import Script from 'next/script';
import { includes } from 'lodash';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';

import ContextWrapper from 'components/ContextWrapper/ContextWrapper';
import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import Navigation from 'components/Navigation/Navigation';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';

const clientSideEmotionCache = createCache({ key: 'css' });

function App({ Component, emotionCache = clientSideEmotionCache, pageProps, session, ...restProps }) {
  return (
    <>
      <Head><title>My Travels</title></Head>
      <Script async id="google-maps" strategy="afterInteractive" src={process.env.NEXT_PUBLIC_MAPS_SRC} />
      <ContextWrapper emotionCache={emotionCache} session={session}>
        <CssBaseline />
        <GlobalLoader />
        <ActiveDialog {...restProps} />
        <Navigation {...restProps} />
        <Component {...pageProps} {...restProps} />
      </ContextWrapper>
    </>
  );
}

export default App;

App.getInitialProps = async({ ctx }) => {
  const mobile = 'mobi'.toLowerCase();

  try {
    const { req: { headers } } = ctx;

    return { isMobile: includes(headers['user-agent'].toLowerCase(), mobile) };
  } catch (e) {
    return { isMobile: includes(navigator.userAgent.toLowerCase(), mobile) };
  }
};
