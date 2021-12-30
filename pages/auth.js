import { includes } from 'lodash';
import { useTheme } from '@mui/material';
import styled from '@emotion/styled';

import ActiveDialog from 'components/ActiveDialog/ActiveDialog';

function Auth({ isMobile }) {
  const { palette: { primary, secondary } } = useTheme();

  const AuthStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right bottom, ${primary.main}, ${secondary.main});
  `;

  return (
    <AuthStyled>
      <ActiveDialog isMobile={isMobile} />
    </AuthStyled>
  );
}

export default Auth;

export async function getServerSideProps({ req }) {
  const mobile = 'mobi'.toLowerCase();

  try {
    const { headers } = req;

    return { props: { isMobile: includes(headers['user-agent'].toLowerCase(), mobile) } };
  } catch (e) {
    return { props: { isMobile: false } };
  }
}
