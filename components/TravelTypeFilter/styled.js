import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';

export const TravelTypeAppbarStyled = styled(AppBar)`
  z-index: ${({ theme }) => theme.zIndex.speedDial};
`;

export const TravelTypeToolbarStyled = styled(Toolbar)`
  justify-content: center;
  margin-top: calc(${({ theme }) => theme.mixins.toolbar.minHeight}px + env(safe-area-inset-top, 0));
`;
