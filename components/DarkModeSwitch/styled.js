import styled from '@emotion/styled';
import { Stack } from '@mui/material';

export const DarkModeSwitchStyled = styled(Stack)`
  .MuiSwitch-root {
    z-index: 1500;
    padding: 7px;

    .MuiSwitch-track {
      border-radius: 20px;
      opacity: 0.2;
    }
  }

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
