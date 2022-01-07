import { memo } from 'react';
import { get, map } from 'lodash';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import StatsPieChartLegend from 'components/Stats/StatsPieChartLegend';

function StatsPieChart({ data }) {
  const { kilometers, cities } = data;
  const pieStats = get(data, ['pieStats']);

  const getFillColor = (i) => `hsl(182, 100%, ${20 + i * 5}%)`;

  return (
    <ResponsiveContainer width="100%" aspect={1}>
      <PieChart>
        <Legend content={<StatsPieChartLegend cities={cities} kilometers={kilometers} />} />
        <Pie data={pieStats} dataKey="value" nameKey="name">
          {map(pieStats, (el, i) => <Cell key={`cell-${i}`} fill={getFillColor(i)} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default memo(StatsPieChart);
