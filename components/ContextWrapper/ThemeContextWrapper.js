import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assign } from 'lodash';
import { CacheProvider } from '@emotion/react';
import { useScrollTrigger } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getColorMode, selectIsDarkModeActive } from 'redux/slices/settings';

export const primaryLight = '#00838f';
export const primaryDark = '#b2ebf2';
export const secondaryLight = '#ef6c00';
export const secondaryDark = '#ffcc80';
export const dividerLight = 'rgba(0,0,0,0.12)';
export const dividerDark = 'rgba(255,255,255,0.12)';
export const backgroundLight = '#ffffff';
export const backgroundDark = '#121212';

function ThemeContextWrapper({ children, emotionCache }) {
  const dispatch = useDispatch();
  const i = +useSelector(selectIsDarkModeActive);
  const trigger = useScrollTrigger();

  const theme = createTheme({
    mixins: { toolbar: { minHeight: 44 } },
    palette: {
      mode: ['light', 'dark'][i],
      primary: { main: [primaryLight, primaryDark][i] },
      secondary: { main: [secondaryLight, secondaryDark][i] },
      divider: [dividerLight, dividerDark][i],
    },
  });

  assign(theme, createTheme(theme, {
    components: {
      MuiAppBar: {
        variants: [
          {
            props: { variant: 'blur', color: 'transparent' },
            style: {
              marginTop: 'env(safe-area-inset-top, 0)',
              height: (2 - trigger) * theme.mixins.toolbar.minHeight,
              backdropFilter: 'blur(10px)',
              backgroundColor: `${[backgroundLight, backgroundDark][i]}BB`,
              boxShadow: `${[dividerLight, dividerDark][i]} 0px -1px 1px inset`,
              transition: `height ${theme.transitions.duration.short}ms ease`,
            },
          },
        ],
      },
      MuiToolbar: {
        variants: [
          { props: { variant: 'extended' }, style: { paddingTop: 'env(safe-area-inset-top, 0)' } },
          {
            props: { variant: 'sticky' },
            style: {
              paddingTop: 5,
              borderTop: `1px solid ${[dividerLight, dividerDark][i]}`,
              justifyContent: 'space-around',
            },
          },
        ],
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            paddingBottom: 'env(safe-area-inset-bottom, 0)',
            backdropFilter: 'blur(10px)',
            backgroundColor: `${[backgroundLight, backgroundDark][i]}BB`,
          },
        },
      },
      MuiBackdrop: { styleOverrides: { root: { backdropFilter: 'blur(10px)' } } },
      MuiCard: {
        styleOverrides: {
          root: {
            '@media(max-width: 600px)': {
              borderRadius: 0,
              border: 'unset',
              borderTop: `1px solid ${[dividerLight, dividerDark][i]}`,
              borderBottom: `1px solid ${[dividerLight, dividerDark][i]}`,
            },
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { padding: '16px 8px' } } },
      MuiDrawer: {
        styleOverrides: {
          paper: { borderRadius: '10px 10px 0 0', paddingBottom: 'env(safe-area-inset-bottom, 0)' },
        },
      },
      MuiTypography: { styleOverrides: { root: { fontWeight: 'lighter' } } },
      MuiButton: { defaultProps: { variant: 'outlined' } },
      MuiLoadingButton: { defaultProps: { variant: 'outlined' } },
    },
  }));

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
