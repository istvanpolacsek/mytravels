import styled from '@emotion/styled';
import { LinearProgress } from '@mui/material';

export const GlobalLoaderStyled = styled(LinearProgress)`
  position: fixed;
  width: 100vw;
  height: 1px;
  top: env(safe-area-inset-top, 0);
  left: 0;
  z-index: 1000;
`;
