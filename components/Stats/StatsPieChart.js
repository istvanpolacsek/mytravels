import { memo } from 'react';
import { get, map } from 'lodash';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { Grid } from '@mui/material';

import StatsPieChartLegend from 'components/Stats/StatsPieChartLegend';

function StatsPieChart({ data }) {
  const { kilometers, cities } = data;
  const pieStats = get(data, ['pieStats']);

  const getFillColor = (i) => `hsl(182, 100%, ${20 + i * 5}%)`;

  return (
    <Grid container justifyContent="center">
      <PieChart width={300} height={350}>
        <Pie cx="50%" outerRadius={60} data={pieStats} dataKey="value" nameKey="name">
          {map(pieStats, (el, i) => <Cell key={`cell-${i}`} fill={getFillColor(i)} />)}
        </Pie>
        <Legend content={<StatsPieChartLegend cities={cities} kilometers={kilometers} />} />
      </PieChart>
    </Grid>
  );
}

export default memo(StatsPieChart);
