import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import haversine from 'haversine';
import { Box, Container, Grid } from '@mui/material';

import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import RecordCard from 'components/Record/RecordCard';
import { selectFilter } from 'redux/slices/records';
import { recordsApi } from 'redux/services/recordsService';
import { toggleLoadingState } from 'redux/slices/settings';
import { HAVERSINE_OPTIONS } from 'lib/constants';

const { endpoints } = recordsApi;

function RecordsContainer() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const { data, isLoading, isFetching: loading } = endpoints.retrieveRecords.useQuery({ filter });

  const getDistance = useCallback((departure, arrival) => {
    return haversine(departure, arrival, HAVERSINE_OPTIONS);
  }, []);

  useEffect(() => {
    dispatch(toggleLoadingState({ loading }));
  }, [loading]);

  return (
    <Container disableGutters maxWidth="md">
      <Box m={{ xs: 0, sm: 1 }}>
        <Grid container spacing={1}>
          {isLoading
            ? map([0, 1, 2, 3], (key) => (<RecordCardSkeleton key={key} />))
            : map(data, (record, i) => <RecordCard key={i} {...record} getDistance={getDistance} />)}
        </Grid>
      </Box>
    </Container>
  );
}

export default memo(RecordsContainer);
