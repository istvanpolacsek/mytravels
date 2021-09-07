import { createContext, useEffect, useMemo, useReducer } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import { SWRConfig } from 'swr';
import DateFnsUtils from '@date-io/date-fns';
import enGBLocale from 'date-fns/locale/en-GB';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { INIT_IS_DARK_MODE, INIT_IS_MOBILE, TOGGLE_DARK_MODE } from 'utils/constants';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const DispatchContext = createContext();
export const StateContext = createContext();
const DispatchProvider = DispatchContext.Provider;
const StateProvider = StateContext.Provider;

const initialState = {
  isMobile: false,
  isDarkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_IS_MOBILE: {
      return {
        ...state,
        isMobile: !!navigator.maxTouchPoints,
      };
    }
    case INIT_IS_DARK_MODE: {
      return {
        ...state,
        isDarkMode: localStorage.getItem('darkState') === 'on',
      };
    }
    case TOGGLE_DARK_MODE: {
      const newValue = !state.isDarkMode;
      localStorage.setItem('darkState', newValue ? 'on' : 'off');
      return {
        ...state,
        isDarkMode: newValue,
      };
    }
    default:
      return state;
  }
};

const ContextWrapper = ({ children, session }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isDarkMode } = state;

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: isDarkMode ? 'dark' : 'light',
        primary: {
          main: isDarkMode ? '#b2ebf2' : '#00838f',
        },
        secondary: {
          main: isDarkMode ? '#ffcc80' : '#ef6c00',
        },
      },
    });
  }, [isDarkMode]);

  useEffect(() => {
    dispatch({ type: INIT_IS_MOBILE });
    dispatch({ type: INIT_IS_DARK_MODE });
  }, []);

  return (
    <AuthProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <DispatchProvider value={dispatch}>
          <StateProvider value={state}>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGBLocale}>
                {children}
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </StateProvider>
        </DispatchProvider>
      </SWRConfig>
    </AuthProvider>
  );
};

export default ContextWrapper;
