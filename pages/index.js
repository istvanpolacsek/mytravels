import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';
import { filter, map, reverse, sortBy } from 'lodash';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/styles';

import RecordCard from 'components/Record/RecordCard';
import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import TraveTypeFilter from 'components/TravelTypeFilter/TravelTypeFilter';
import useUserData from 'hooks/useUserData';
import StateContext from 'utils/StateContext';

const Index = () => {
  const [session] = useSession();
  const { data, isLoading } = useUserData();
  const theme = useTheme();
  const {
    state: { mobile },
  } = useContext(StateContext);

  const [filtered, setFiltered] = useState(data || []);
  const [traveltype, setTraveltype] = useState('');

  useEffect(() => {
    if (data) {
      setFiltered(traveltype ? filter(data, { traveltype }) : data);
    }
  }, [data, traveltype]);

  const handleFilter = ({ target: { value } }) => {
    setTraveltype(value);
  };

  const presented = reverse(sortBy(filtered, ['traveldate']));

  return (
    <Grid container style={{ height: '100vh' }}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="My Travels" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <Grid
        container
        direction="column"
        style={{ paddingTop: theme.mixins.toolbar.minHeight + 20 }}
      >
        {session && (
          <Grid container justify="center">
            <TraveTypeFilter value={traveltype} handleChange={handleFilter} />
          </Grid>
        )}
        {session && isLoading && (
          <Grid container>
            {map(mobile ? [0, 1, 2] : [0, 1, 2, 3], (value) => (
              <RecordCardSkeleton key={value} />
            ))}
          </Grid>
        )}
        <Grid container direction="row">
          {map(presented, (record, i) => (
            <RecordCard key={i} record={record}></RecordCard>
          ))}
        </Grid>
        <div style={{ height: mobile ? '100px' : '60px' }} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export default Index;
