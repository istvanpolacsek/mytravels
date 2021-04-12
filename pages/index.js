import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navigation from '../components/navigation';
import SignIn from '../components/signin';
import RecordCard from '../components/recordcard';
import TraveTypeFieldset from '../components/traveltypefieldset';
import { useQuery } from 'react-query';
import { AppBar } from '@material-ui/core';
import Head from 'next/head';

const Index = () => {
  const [session] = useSession();
  const userid = (!session || typeof session === 'undefined') ? undefined : session.user.id;

  const { data, isFetching } = useQuery(userid, { refetchOnWindowFocus: false });

  const theme = useTheme();

  const [filtered, setFiltered] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (data) {
      setFiltered(filter === 'All'
        ? data.data
        : data.data.filter(e => e.traveltype === filter));
    }
  }, [data, filter]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <Grid>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="My Travels" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <Navigation />
      <SignIn />
      {isFetching && (
        <Backdrop open={true}>
          <CircularProgress color="primary" size={40} />
        </Backdrop>
      )}
      {session && filtered && (
        <Grid container direction="column" style={{ paddingTop: theme.mixins.toolbar.minHeight + 10, height: '100vh' }} >
          <Grid container direction="row" >
            {filtered.map(record => (
              <RecordCard key={record._id} record={record}></RecordCard>
            ))}
          </Grid>
          <Grid item component="div" style={{ height: 100 }} />
          {navigator.maxTouchPoints == 0 && (
            <AppBar fixed="true" style={{ top: 'auto', bottom: 0 }}>
              <TraveTypeFieldset value={filter} handleChange={handleFilter} />
            </AppBar>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default Index;