import { includes } from 'lodash';
import styled from '@emotion/styled';

import TravelTypeFilter from 'components/TravelTypeFilter/TravelTypeFilter';
import Navigation from 'components/Navigation/Navigation';
import withAuth from 'components/hocs/withAuth';
import { useDispatch } from 'react-redux';
import { setIsMobile } from 'redux/slices/settings';
import { useEffect } from 'react';
import RecordsContainer from 'components/RecordsContainer/RecordsContainer';

const HomeStyled = styled.div`
  margin-top: calc(${({ theme }) => (10 + 2 * theme.mixins.toolbar.minHeight)}px + env(safe-area-inset-top, 0));
`;

function Home({ isMobile }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsMobile({ isMobile }));
  }, []);

  return (
    <HomeStyled>
      <Navigation />
      {/* <TravelTypeFilter /> */}
      <RecordsContainer />
    </HomeStyled>
  );
}

export default withAuth(Home);

export async function getServerSideProps({ req }) {
  const mobile = 'mobi'.toLowerCase();

  try {
    const { headers } = req;

    return { props: { isMobile: includes(headers['user-agent'].toLowerCase(), mobile) } };
  } catch (e) {
    return { props: { isMobile: false } };
  }
}
