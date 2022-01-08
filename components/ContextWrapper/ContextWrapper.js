import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import ThemeContextWrapper from 'components/ContextWrapper/ThemeContextWrapper';
import store from 'redux/store';
import { LocalizationProvider } from '@mui/lab';

import AdapterLuxon from '@mui/lab/AdapterLuxon';

function ContextWrapper({ children, emotionCache, session }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <LocalizationProvider dateAdapter={AdapterLuxon} locale="en-GB">
          <ThemeContextWrapper emotionCache={emotionCache}>
            {children}
          </ThemeContextWrapper>
        </LocalizationProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}

export default ContextWrapper;
