import styled from '@emotion/styled';
import { useTheme } from '@mui/material';

function Auth() {
  const { palette: { primary, secondary, background } } = useTheme();

  const AuthStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right bottom, ${primary.main}, ${secondary.main});
  `;

  return <AuthStyled />;
}

export default Auth;
