import styled from '@emotion/styled';
import { Stack, Toolbar } from '@mui/material';

export const ToolbarStyled = styled(Toolbar)`
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

export const MobileToolbar = styled(Toolbar)`
  margin-bottom: 15px;
  justify-content: space-between;
`;

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
