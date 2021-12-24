import { memo } from 'react';
import { Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';

const RecordCardSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circular" width={25} height={25} />}
          title={<Skeleton variant="text" width={180} />}
          subheader={<Skeleton variant="text" width={80} />}
        />
        <Skeleton variant="rectangular" height={150} />
        <CardContent>
          <Grid container justifyContent="space-between">
            <Skeleton variant="text" width={70} />
            <Skeleton variant="text" width={50} />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default memo(RecordCardSkeleton);
