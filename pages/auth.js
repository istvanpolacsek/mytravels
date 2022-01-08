import { includes } from 'lodash';
import { useTheme } from '@mui/material';
import styled from '@emotion/styled';

import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setIsMobile } from 'redux/slices/settings';

function Auth({ isMobile }) {
  const dispatch = useDispatch();
  const { palette: { primary, secondary } } = useTheme();

  const AuthStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right bottom, ${primary.main}, ${secondary.main});
  `;

  useEffect(() => {
    dispatch(setIsMobile({ isMobile }));
  }, []);

  return (
    <AuthStyled>
      <ActiveDialog/>
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
