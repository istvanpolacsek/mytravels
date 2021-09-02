import 'fontsource-roboto';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Provider as AuthProvider } from 'next-auth/client';
import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import enGBLocale from 'date-fns/locale/en-GB';

import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import Navigation from 'components/Navigation/Navigation';
import { StateProvider } from 'utils/StateContext';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MyApp = ({ Component, pageProps }) => {
  const [state, setState] = useState({
    darkState: false,
    mobile: false,
  });
  const { darkState } = state;

  const theme = createMuiTheme({
    palette: {
      type: darkState ? 'dark' : 'light',
      primary: {
        main: darkState ? '#b2ebf2' : '#00838f',
      },
      secondary: {
        main: darkState ? '#ffcc80' : '#ef6c00',
      },
    },
  });

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setState({
      ...state,
      darkState: localStorage.getItem('darkState') == 'on' ? true : false,
      mobile: !!navigator.maxTouchPoints,
    });
  }, []);

  return (
    <AuthProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <StateProvider value={{ state, setState }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGBLocale}>
            <ThemeProvider theme={theme}>
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
              <CssBaseline />
              <Navigation />
              <ActiveDialog />
              <Component {...pageProps} />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </StateProvider>
      </SWRConfig>
    </AuthProvider>
  );
};

export default MyApp;
