import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import AppHead from 'components/AppHead/AppHead';
import ContextWrapper from 'components/ContextWrapper/ContextWrapper';
import Navigation from 'components/Navigation/Navigation';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ContextWrapper session={pageProps.session}>
      <AppHead />
      <CssBaseline />
      <Navigation />
      <ActiveDialog />
      <Component {...pageProps} />
    </ContextWrapper>
  );
};

export default MyApp;
