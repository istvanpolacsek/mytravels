import { includes } from 'lodash';
import styled from '@emotion/styled';

import TravelTypeFilter from 'components/TravelTypeFilter/TravelTypeFilter';
import ActiveDialog from 'components/ActiveDialog/ActiveDialog';
import Navigation from 'components/Navigation/Navigation';
import RecordsContainer from 'components/RecordsContainer/RecordsContainer';
import withAuth from 'components/hocs/withAuth';

const HomeStyled = styled.div`
  margin-top: ${({ theme }) => (10 + 2 * theme.mixins.toolbar.minHeight)}px;
`;

function Home({ isMobile }) {
  return (
    <HomeStyled>
      <TravelTypeFilter />
      <ActiveDialog isMobile={isMobile} />
      <Navigation isMobile={isMobile} />
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
