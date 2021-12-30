import styled from '@emotion/styled';

import TravelTypeFilter from 'components/TravelTypeFilter/TravelTypeFilter';
import RecordsContainer from 'components/RecordsContainer/RecordsContainer';
import withAuth from 'components/hocs/withAuth';

const HomeStyled = styled.div`
  margin-top: ${({ theme }) => (10 + 2 * theme.mixins.toolbar.minHeight)}px;
  margin-bottom: ${({ theme }) => (20 + theme.mixins.toolbar.minHeight)}px
`;

function Home() {
  return (
    <HomeStyled>
      <TravelTypeFilter />
      <RecordsContainer />
    </HomeStyled>
  );
}

export default withAuth(Home);
