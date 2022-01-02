import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';

export const CenteredToolbarStyled = styled(Toolbar)`
  justify-content: center;
`;

export const TravelTypeFilterStyled = styled(AppBar)`
  margin-top: calc(${({ theme }) => theme.mixins.toolbar.minHeight}px + env(safe-area-inset-top, 0));
  z-index: ${({ theme }) => theme.zIndex.speedDial};
`;
