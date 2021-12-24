import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import { Box, Container, Grid } from '@mui/material';
import haversine from 'haversine';

import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import RecordCard from 'components/Record/RecordCard';
import { selectFilter } from 'redux/slices/records';
import { recordsApi } from 'redux/services/recordsService';
import { HAVERSINE_OPTIONS } from 'lib/constants';

const { useFetchAllRecordsQuery } = recordsApi;

function RecordsContainer() {
  const filter = useSelector(selectFilter);
  const { data, status } = useFetchAllRecordsQuery({ filter });

  const getDistance = useCallback((departure, arrival) => {
    return haversine(departure, arrival, HAVERSINE_OPTIONS);
  }, []);

  return (
    <Container disableGutters maxWidth="md">
      <Box m={{ xs: 0, sm: 1 }}>
        <Grid container spacing={1}>
          {status === 'fulfilled'
            ? map(data, (record, i) => <RecordCard key={i} {...record} getDistance={getDistance} />)
            : map([0, 1, 2, 3], (key) => (<RecordCardSkeleton key={key} />))}
        </Grid>
      </Box>
    </Container>
  );
}

export default memo(RecordsContainer);
