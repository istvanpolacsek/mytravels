import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getColorMode, selectIsDarkModeActive } from 'redux/slices/settings';

export const primaryLight = '#00838f';
export const primaryDark = '#b2ebf2';
export const secondaryLight = '#ef6c00';
export const secondaryDark = '#ffcc80';
export const dividerLight = 'rgba(0,0,0,0.12)';
export const dividerDark = 'rgba(255,255,255,0.12)';

function ThemeContextWrapper({ children, emotionCache }) {
  const dispatch = useDispatch();
  const i = +useSelector(selectIsDarkModeActive);

  const theme = createTheme({
    mixins: { toolbar: { minHeight: 44 } },
    palette: {
      mode: ['light', 'dark'][i],
      primary: { main: [primaryLight, primaryDark][i] },
      secondary: { main: [secondaryLight, secondaryDark][i] },
      divider: [dividerLight, dividerDark][i],
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            boxShadow: [`inset 1px 1px ${dividerLight}, inset -1px -1px ${dividerLight}`, 'unset'][i],
          },
        },
      },
      MuiDrawer: { styleOverrides: { paper: { borderRadius: '10px 10px 0 0' } } },
      MuiTypography: { styleOverrides: { root: { fontWeight: 'lighter' } } },
      MuiBackdrop: { styleOverrides: { root: { backdropFilter: 'blur(10px)' } } },
      MuiAppBar: {
        styleOverrides: {
          colorTransparent: {
            backdropFilter: 'blur(10px)',
            boxShadow: `${[dividerLight, dividerDark][i]} 0px -1px 1px inset`,
          },
        },
      },
    },
  });

  useEffect(() => {
    dispatch(getColorMode());
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default ThemeContextWrapper;
