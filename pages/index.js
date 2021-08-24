import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import { useTheme } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import SignIn from '../components/signin';
import RecordCard from '../components/recordcard';
import TraveTypeFieldset from '../components/traveltypefieldset';
import StateContext from '../utils/statecontext';
import { filter } from 'lodash';

const Index = () => {
  const [session] = useSession();

  const { data, status } = useQuery(session?.user.id);
  const {
    state: { mobile },
  } = useContext(StateContext);
  const theme = useTheme();

  const [filtered, setFiltered] = useState(null);
  const [traveltype, setTraveltype] = useState("");

  useEffect(() => {
    if (data) {
      setFiltered(traveltype ? filter(data.data, { traveltype }) : data.data);
    }
  }, [data, traveltype]);

  const handleFilter = (event) => {
    setTraveltype(event.target.value);
  };

  return (
    <Grid container style={{ height: '100vh' }}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="My Travels" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <SignIn />
      {status === 'loading' && (
        <Box zIndex="speedDial">
          <Backdrop open={true}>
            <CircularProgress color="primary" size={40} />
          </Backdrop>
        </Box>
      )}
      {session && filtered && (
        <Grid
          container
          direction="column"
          style={{ paddingTop: theme.mixins.toolbar.minHeight + 10 }}
        >
          <Grid container direction="row">
            {filtered.map((record) => (
              <RecordCard key={record._id} record={record}></RecordCard>
            ))}
          </Grid>
          <Grid item style={{ height: 100 }}></Grid>
        </Grid>
      )}
      {session && filtered && !mobile && (
        <AppBar fixed="true" style={{ top: 'auto', bottom: 0 }}>
          <TraveTypeFieldset value={traveltype} handleChange={handleFilter} />
        </AppBar>
      )}
    </Grid>
  );
};

export default Index;
