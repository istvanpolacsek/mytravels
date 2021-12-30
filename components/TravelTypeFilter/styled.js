import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';

export const CenteredToolbarStyled = styled(Toolbar)`
  justify-content: center;
`;

export const TravelTypeFilterStyled = styled(AppBar)`
  top: ${({ theme }) => theme.mixins.toolbar.minHeight}px;
`;
