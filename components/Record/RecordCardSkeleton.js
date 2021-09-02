import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const RecordCardSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box m={1}>
        <Card>
          <CardHeader
            avatar={<Skeleton variant="circle" width={25} height={25} />}
            title={<Skeleton variant="text" width={180} />}
            subheader={<Skeleton variant="text" width={80} />}
          />
          <Skeleton variant="rect" height={150} />
          <CardContent>
            <Grid container justify="space-between">
              <Skeleton variant="text" width={70} />
              <Skeleton variant="text" width={50} />
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default RecordCardSkeleton;
