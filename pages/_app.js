import 'fontsource-roboto';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import enGBLocale from 'date-fns/locale/en-GB';
import { StateProvider } from '../utils/statecontext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

const appurl = process.env.NEXT_PUBLIC_URL;

const fetchRecords = async ({ queryKey }) => {
  const userid = queryKey;
  const response = await fetch(`${appurl}/api/travelrecords?` + new URLSearchParams({ userid }));
  if (!response.ok) {
    throw new Error('Network Error while fetching data');
  }
  return response.json();
}

const MyApp = ({ Component, pageProps }) => {
  const queryClient = useRef();
  if (!queryClient.current) {
    queryClient.current = new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: fetchRecords
        }
      }
    });
  }

  const [state, setState] = useState({ darkState: false });

  const { darkState } = state;

  const paletteType = darkState ? 'dark' : 'light';
  const primary = darkState ? '#b2ebf2' : '#00838f';
  const secondary = darkState ? '#ffcc80' : '#ef6c00';

  const theme = createMuiTheme({
    palette: {
      type: paletteType,
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      }
    }
  });

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setState({
      ...state,
      darkState: localStorage.getItem('darkState') == 'on' ? true : false,
      records: []
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
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                </Head>
                <CssBaseline />
                <Component {...pageProps} />
              </StateProvider>
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default MyApp;