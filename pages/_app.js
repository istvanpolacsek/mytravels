import 'fontsource-roboto';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Provider as AuthProvider } from 'next-auth/client';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import enGBLocale from 'date-fns/locale/en-GB';

import Navigation from '../components/navigation';
import { StateProvider } from '../utils/statecontext';

const fetchRecords = async ({ queryKey }) => {
  const response = await fetch(
    '/api/travelrecords?' +
      new URLSearchParams({ userid: queryKey })
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Network Error while fetching data');
  }
};

const MyApp = ({ Component, pageProps }) => {
  const queryClient = useRef();
  if (!queryClient.current) {
    queryClient.current = new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: fetchRecords,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  const [state, setState] = useState({ darkState: false });

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
      mobile: navigator.maxTouchPoints > 0,
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGBLocale}>
        <QueryClientProvider client={queryClient.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider session={pageProps.session}>
              <StateProvider value={{ state, setState }}>
                <Head>
                  <title>My Travels</title>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                  />
                  <meta name="apple-mobile-web-app-capable" content="yes" />
                  <meta
                    name="apple-mobile-web-app-title"
                    content="My Travels"
                  />
                  <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black"
                  />
                </Head>
                <CssBaseline />
                <Navigation />
                <Component {...pageProps} />
              </StateProvider>
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default MyApp;
