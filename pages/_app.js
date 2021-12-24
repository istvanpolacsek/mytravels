import Head from 'next/head';
import { includes } from 'lodash';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';

import ContextWrapper from 'components/ContextWrapper/ContextWrapper';
import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import Navigation from 'components/Navigation/Navigation';

const clientSideEmotionCache = createCache({ key: 'css' });

function App({ Component, emotionCache = clientSideEmotionCache, pageProps, session, ...restProps }) {
  return (
    <>
      <Head><title>My Travels</title></Head>
      <ContextWrapper emotionCache={emotionCache} session={session}>
        <CssBaseline />
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
