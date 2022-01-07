import { memo } from 'react';
import { get, map } from 'lodash';
import { Cell, Legend, Pie, PieChart } from 'recharts';

import StatsPieChartLegend from 'components/Stats/StatsPieChartLegend';
import { StatsPieChartStyled } from 'components/Stats/styled';

function StatsPieChart({ data }) {
  const { kilometers, cities } = data;
  const pieStats = get(data, ['pieStats']);

  const getFillColor = (i) => `hsl(182, 100%, ${20 + i * 5}%)`;

  return (
    <StatsPieChartStyled width="100%" height={300}>
      <PieChart>
        <Legend content={<StatsPieChartLegend cities={cities} kilometers={kilometers} />} />
        <Pie outerRadius={60} data={pieStats} dataKey="value" nameKey="name">
          {map(pieStats, (el, i) => <Cell key={`cell-${i}`} fill={getFillColor(i)} />)}
        </Pie>
      </PieChart>
    </StatsPieChartStyled>
  );
}

export default memo(StatsPieChart);
