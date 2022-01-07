import { useMemo } from 'react';
import { find, map, reduce, round } from 'lodash';
import { Chip, Grid } from '@mui/material';
import { RiBuilding2Line, RiRoadMapLine } from 'react-icons/ri';
import { CgInfinity } from 'react-icons/cg';

import { TRAVEL_TYPES } from 'lib/constants';

function StatsPieChartLegend({ cities, kilometers, payload }) {
  const fields = useMemo(() => [
    ...map(payload, ({ value: key, payload: { value, fill } }) => (
      { label: find(TRAVEL_TYPES, { key }).label, value, fill, icon: find(TRAVEL_TYPES, { key }).passiveIcon }
    )),
    {
      label: 'Total Travels:',
      value: reduce(payload, (acc, { payload: { value } }) => acc + value, 0),
      icon: CgInfinity,
    },
    { label: 'Cities Visited:', value: cities, icon: RiBuilding2Line },
    { label: 'Total Traveled:', value: `${round(kilometers, 0)} km`, icon: RiRoadMapLine },
  ], [cities, kilometers, payload]);

  return map(fields, ({ label, value, fill, icon: Icon }, i) => (
    <Grid container m={0.5} key={i} alignItems="center" justifyContent="space-between">
      <Grid item>{Icon && <Icon />} {label}</Grid>
      <Chip variant="outlined" size="small" label={value} style={{ backgroundColor: fill }} />
    </Grid>
  ));
}

export default StatsPieChartLegend;
