import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';

export const CenteredToolbarStyled = styled(Toolbar)`
  justify-content: center;
`;

export const TravelTypeFilterStyled = styled(AppBar)`
  top: calc(${({ theme }) => theme.mixins.toolbar.minHeight}px + env(safe-area-inset-top, 0));
`;
