import { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import haversine from 'haversine';
import { Box, Container, Grid } from '@mui/material';

import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import RecordCard from 'components/Record/RecordCard';
import { increaseLimit, selectFilter, selectLimit } from 'redux/slices/records';
import { recordsApi } from 'redux/services/recordsService';
import { toggleLoadingState } from 'redux/slices/settings';
import { HAVERSINE_OPTIONS } from 'lib/constants';

const { endpoints } = recordsApi;

function RecordsContainer() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const limit = useSelector(selectLimit);
  const { data, isLoading, isFetching: loading } = endpoints.retrieveRecords.useQuery({ filter, limit });

  const observer = useRef();

  const lastRecordRef = useCallback((record) => {
    console.log('---> RecordsContainer.js, line:25', record);

    const currentObserver = observer.current;

    if (currentObserver) {
      currentObserver.unobserve();
    }

    currentObserver = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];

      if (isIntersecting) {
        dispatch(increaseLimit());
      }
    }, { threshold: 0.5 });

    if (record) {
      currentObserver.observe(record);
    }
  }, [data?.length]);

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
            : map(data, (record, i) => (
              <RecordCard
                key={i}
                ref={i === data.length - 1 ? lastRecordRef : null}
                getDistance={getDistance}
                {...record}
              />))}
        </Grid>
      </Box>
    </Container>
  );
}

export default memo(RecordsContainer);
