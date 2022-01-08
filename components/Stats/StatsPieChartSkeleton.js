import { memo } from 'react';
import { map } from 'lodash';
import { Grid, Skeleton } from '@mui/material';

function StatsPieChartSkeleton() {
  return (<>
    <Grid container justifyContent="center">
      <Grid item mt={4} mb={2}>
        <Skeleton variant="circular" width={120} height={120} />
      </Grid>
    </Grid>
    {map(new Array(6), (el, i) => (
      <Grid key={i} container justifyContent="space-between" mt={0.5} mb={0.5} pl={4} pr={4}>
        <Skeleton width={100} />
        <Skeleton width={20} />
      </Grid>
    ))}
  </>);
}

export default memo(StatsPieChartSkeleton);
