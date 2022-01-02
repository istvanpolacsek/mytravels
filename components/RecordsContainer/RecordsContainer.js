import { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map, nth, tail } from 'lodash';
import haversine from 'haversine';
import { Box, CircularProgress, Container, Grid } from '@mui/material';

import RecordCard from 'components/Record/RecordCard';
import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import { recordsApi } from 'redux/services/recordsService';
import { increaseLimit, selectQuerySettings } from 'redux/slices/records';
import { toggleLoadingState } from 'redux/slices/settings';
import useRoutes from 'hooks/useRoutes';
import { HAVERSINE_OPTIONS } from 'lib/constants';
import { LoaderItemStyled } from 'components/RecordsContainer/styled';

const { useRetrieveRecordsQuery } = recordsApi;

function RecordsContainer() {
  const dispatch = useDispatch();
  const observer = useRef(null);
  const { toDeleteRecord, toEditRecord } = useRoutes();

  const querySettings = useSelector(selectQuerySettings);
  const { data, isLoading, isFetching: loading } = useRetrieveRecordsQuery(querySettings);
  const hasMore = data && data[0]?.count > querySettings.limit;
  const records = tail(data);

  const lastRecordRef = useCallback((record) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      const { isIntersecting } = nth(entries, 0);

      if (isIntersecting && hasMore && !loading) {
        dispatch(increaseLimit());
      }
    }, { threshold: 0, rootMargin: '100px 0px 0px 0px' });

    if (record) {
      observer.current.observe(record);
    }
  }, [hasMore, loading]);

  const handleDeleteRecord = useCallback((id) => toDeleteRecord({ id }), []);
  const handleEditRecord = useCallback((id) => toEditRecord({ id }), []);
  const handleGetDistance = useCallback((departure, arrival) => haversine(departure, arrival, HAVERSINE_OPTIONS), []);

  const actions = ({
    onDeleteRecord: handleDeleteRecord,
    onEditRecord: handleEditRecord,
    onGetDistance: handleGetDistance,
  });

  useEffect(() => {
    dispatch(toggleLoadingState({ loading }));
  }, [loading]);

  return (
    <Container disableGutters maxWidth="md">
      <Box m={{ xs: 0, sm: 1 }}>
        <Grid container spacing={1}>
          {isLoading
            ? map(new Array(4), (el, i) => <RecordCardSkeleton key={i} />)
            : map(records, (record, i) => <RecordCard key={i} {...actions} {...record} />)}
        </Grid>
        {data?.length && <Grid container justifyContent="center" alignItems="flex-start">
          <LoaderItemStyled item ref={lastRecordRef}>
            {loading && <CircularProgress size={25} color="inherit" />}
          </LoaderItemStyled>
        </Grid>}
      </Box>
    </Container>
  );
}

export default memo(RecordsContainer);
