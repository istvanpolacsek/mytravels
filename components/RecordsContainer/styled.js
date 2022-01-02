import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const LoaderItemStyled = styled(Grid)`
  height: 60px;
  padding-top: 10px;
  padding-bottom: calc(${({ theme }) => theme.mixins.toolbar.minHeight}px + env(safe-area-inset-bottom, 0));
`;
