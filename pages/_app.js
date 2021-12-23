import ContextWrapper from 'components/ContextWrapper/ContextWrapper';
import { CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import Navigation from 'components/Navigation/Navigation';

const clientSideEmotionCache = createCache({ key: 'css' });

function App({ Component, emotionCache = clientSideEmotionCache, pageProps, session }) {
  return (
    <ContextWrapper emotionCache={emotionCache} session={session}>
      <CssBaseline />
      <ActiveDialog />
      <Navigation />
      <Component {...pageProps} />
    </ContextWrapper>
  );
}

export default App;
