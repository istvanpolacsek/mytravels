import styled from '@emotion/styled';
import { Grid } from '@mui/material';

const margin = 10;

export const LoaderItemStyled = styled(Grid)`
  height: 60px;
  margin-top: ${margin}px;
  padding-bottom: calc(${({ theme }) => theme.mixins.toolbar.minHeight}px + env(safe-area-inset-bottom, 0) + ${margin}px);
`;
