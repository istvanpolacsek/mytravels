import { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map, nth, tail } from 'lodash';
import haversine from 'haversine';
import { Box, CircularProgress, Container, Grid } from '@mui/material';

import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import RecordCard from 'components/Record/RecordCard';
import { increaseLimit, selectFilter, selectLimit, selectQuerySettings } from 'redux/slices/records';
import { recordsApi } from 'redux/services/recordsService';
import { toggleLoadingState } from 'redux/slices/settings';
import { HAVERSINE_OPTIONS } from 'lib/constants';

const { useRetrieveRecordsQuery } = recordsApi;

function RecordsContainer() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const limit = useSelector(selectLimit);
  const { data, isLoading, isFetching: loading } = useRetrieveRecordsQuery({ filter, limit });
  const hasMore = data && data[0]?.count > limit;
  const records = tail(data);
  const observer = useRef(null);

  const lastRecordRef = useCallback((record) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      const { isIntersecting } = nth(entries, 0);

      if (isIntersecting && hasMore && !loading) {
        dispatch(increaseLimit());
      }
    }, { threshold: 0 });

    if (record) {
      observer.current.observe(record);
    }
  }, [hasMore, loading]);

  const getDistance = useCallback((departure, arrival) => haversine(departure, arrival, HAVERSINE_OPTIONS), []);

  useEffect(() => {
    dispatch(toggleLoadingState({ loading }));
  }, [loading]);

  const a = useSelector(selectQuerySettings);
  console.log('---> RecordsContainer.js, line:50', a);

  return (
    <Container disableGutters maxWidth="md">
      <Box m={{ xs: 0, sm: 1 }}>
        <Grid container spacing={1}>
          {isLoading
            ? map(new Array(4), (el, i) => (<RecordCardSkeleton key={i} />))
            : map(records, (record, i) => (
              <RecordCard
                key={i}
                ref={i === records.length - 1 ? lastRecordRef : null}
                getDistance={getDistance}
                {...record}
              />))}
        </Grid>
        {data?.length && <Grid container justifyContent="center" alignItems="flex-start">
          <Grid item mb={6} mt={1}>
            {loading && <CircularProgress size={25} color="inherit" />}
          </Grid>
        </Grid>}
      </Box>
    </Container>
  );
}

export default memo(RecordsContainer);
