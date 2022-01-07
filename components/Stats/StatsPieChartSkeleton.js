import { memo } from 'react';
import { Grid, Skeleton } from '@mui/material';
import { map } from 'lodash';

function StatsPieChartSkeleton() {
  return (<>
    <Grid container justifyContent="center">
      <Grid item m={2}>
        <Skeleton variant="circular" width={120} height={120} />
      </Grid>
    </Grid>
    {map(new Array(5), (el, i) => (
      <Grid key={i} container justifyContent="space-between">
        <Skeleton width={100} />
        <Skeleton width={20} />
      </Grid>
    ))}
  </>);
}

export default memo(StatsPieChartSkeleton);
