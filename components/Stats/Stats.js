import { memo, useState } from 'react';
import { get, includes, map, round } from 'lodash';
import { Button, DialogActions, DialogContent, DialogTitle, Grid, Skeleton, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

import StatsPieChartSkeleton from 'components/Stats/StatsPieChartSkeleton';
import StatsPieChart from 'components/Stats/StatsPieChart';
import { recordsApi } from 'redux/services/recordsService';
import useRoutes from 'hooks/useRoutes';

const { useRetrieveStatsQuery } = recordsApi;

const TabLabelSkeleton = () => (
  <Grid container direction="column" alignItems="center">
    <Skeleton width={50} />
    <Skeleton width={55} />
  </Grid>
);

const TabLabel = ({ year, kilometers }) => (
  <Grid container direction="column">
    <Grid item>{year}</Grid>
    <Grid item>
      <Typography variant="caption">{`${round(kilometers, 0)} km`}</Typography>
    </Grid>
  </Grid>
);

function Stats() {
  const { toHomePage } = useRoutes();
  const { data, isLoading, isFetching } = useRetrieveStatsQuery({});

  const [tab, setTab] = useState('0');

  const handleTabChange = (e, val) => setTab(val);

  return (
    <DialogContent>
      <DialogTitle>Stats</DialogTitle>
      <DialogContent>
        <TabContext value={tab}>
          <TabList centered onChange={handleTabChange}>
            {includes([isLoading, isFetching], true)
              ? map(new Array(2), (el, i) => <Tab disabled key={i} value={`${i}`} label={<TabLabelSkeleton />} />)
              : map(data, ({ year, kilometers }, i) => (
                <Tab key={i} value={`${i}`} label={<TabLabel year={year} kilometers={kilometers} />} />))}
          </TabList>
          {includes([isLoading, isFetching], true)
            ? <StatsPieChartSkeleton />
            : <StatsPieChart data={get(data, [tab])} />}
        </TabContext>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Button fullWidth onClick={toHomePage}>
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </DialogContent>
  );
}

export default memo(Stats);
