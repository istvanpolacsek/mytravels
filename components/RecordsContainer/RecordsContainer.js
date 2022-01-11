import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { map, tail } from 'lodash';
import haversine from 'haversine';
import { Box, Grid } from '@mui/material';

import RecordCard from 'components/Record/RecordCard';
import RecordCardSkeleton from 'components/Record/RecordCardSkeleton';
import { recordsApi } from 'redux/services/recordsService';
import { selectQuerySettings } from 'redux/slices/records';
import useRoutes from 'hooks/useRoutes';
import { HAVERSINE_OPTIONS } from 'lib/constants';
import RecordsFetchWrapper from 'components/RecordsContainer/FetchWrapper';

const { useRetrieveRecordsQuery } = recordsApi;

function RecordsContainer() {
  const querySettings = useSelector(selectQuerySettings);
  const { data, isLoading } = useRetrieveRecordsQuery(querySettings);
  const { toDeleteRecord, toEditRecord } = useRoutes();
  const records = tail(data);

  const handleDeleteRecord = useCallback((id) => toDeleteRecord({ id }), []);
  const handleEditRecord = useCallback((id) => toEditRecord({ id }), []);
  const handleGetDistance = useCallback((departure, arrival) => haversine(departure, arrival, HAVERSINE_OPTIONS), []);

  const actions = ({
    onDeleteRecord: handleDeleteRecord,
    onEditRecord: handleEditRecord,
    onGetDistance: handleGetDistance,
  });

  return (
    <RecordsFetchWrapper>
      <Box m={{ xs: 0, sm: 1 }}>
        <Grid container spacing={1}>
          {isLoading
            ? map(new Array(4), (el, i) => <RecordCardSkeleton key={i} />)
            : map(records, (record, i) => <RecordCard key={i} {...actions} {...record} />)}
        </Grid>
      </Box>
    </RecordsFetchWrapper>
  );
}

export default memo(RecordsContainer);
