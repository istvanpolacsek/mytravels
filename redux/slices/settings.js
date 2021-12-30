import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { darkMode: true, loading: false },
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
    toggleLoadingState(state, { payload }) {
      assign(state, payload);
    },
  },
});

export const { getColorMode, toggleColorMode, toggleLoadingState } = settingsSlice.actions;

export const selectIsDarkModeActive = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.darkMode,
);

export const selectIsGlobalLoading = createDraftSafeSelector(
  (state) => state,
  ({ settings }) => settings.loading,
);

export default settingsSlice.reducer;
