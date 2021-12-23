import { Grid } from '@mui/material';

import TravelTypeFilter from 'components/TravelTypeFilter/TravelTypeFilter';
import withAuth from 'components/hocs/withAuth';

function Home() {
  return (
    <Grid sx={{ height: '200vh' }}>
      <TravelTypeFilter />
    </Grid>
  );
}

export default withAuth(Home);
