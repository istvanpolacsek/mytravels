import styled from '@emotion/styled';
import { Stack } from '@mui/material';

export const DarkModeSwitchStyled = styled(Stack)`
  svg {
    position: absolute;
  }

  svg:first-of-type {
    transform: translateX(11px);
  }

  svg:last-of-type {
    transform: translateX(31px);
  }
`;
