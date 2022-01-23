import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { darkMode: true, isMobile: true, showLabels: false },
  reducers: {
    setIsMobile(state, { payload }) {
      assign(state, payload);
    },
    getColorMode(state) {
      const darkMode = localStorage.getItem('darkMode') === 'true';

      assign(state, { darkMode });
    },
    getShowLabels(state) {
      const showLabels = localStorage.getItem('displayLabels') === 'true';

      assign(state, { showLabels });
    },
    toggleColorMode(state, { payload }) {
      const { darkMode } = payload;

      localStorage.setItem('darkMode', darkMode);
      assign(state, payload);
    },
    toggleShowLabels(state, { payload }) {
      const { showLabels } = payload;

      localStorage.setItem('showLabels', showLabels);
      assign(state, { showLabels });
    },
  },
});

export const { getColorMode, toggleColorMode, setIsMobile, toggleShowLabels, getShowLabels } = settingsSlice.actions;

export const selectIsDarkModeActive = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.darkMode,
);

export const selectIsMobile = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.isMobile,
);

export const selectShowLabels = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.showLabels,
);

export default settingsSlice.reducer;
