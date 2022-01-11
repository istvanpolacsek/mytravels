import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { darkMode: true, isMobile: true },
  reducers: {
    getColorMode(state) {
      const darkMode = localStorage.getItem('darkMode') === 'true';

      assign(state, { darkMode });
    },
    toggleColorMode(state, { payload }) {
      const { darkMode } = payload;

      localStorage.setItem('darkMode', darkMode);
      assign(state, payload);
    },
    setIsMobile(state, { payload }) {
      assign(state, payload);
    },
  },
});

export const { getColorMode, toggleColorMode, setIsMobile } = settingsSlice.actions;

export const selectIsDarkModeActive = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.darkMode,
);

export const selectIsMobile = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.isMobile,
);

export default settingsSlice.reducer;
