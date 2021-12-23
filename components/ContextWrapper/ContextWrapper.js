import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import ThemeContextWrapper from 'components/ContextWrapper/ThemeContextWrapper';
import store from 'redux/store';

function ContextWrapper({ children, emotionCache, session }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <ThemeContextWrapper emotionCache={emotionCache}>
          {children}
        </ThemeContextWrapper>
      </SessionProvider>
    </ReduxProvider>
  );
}

export default ContextWrapper;
