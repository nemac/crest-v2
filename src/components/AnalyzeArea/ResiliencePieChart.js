import React from 'react';
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { mapConfig } from '../../configuration/config';

const COLORS = mapConfig.resiliencePieChartLegend;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent === 0) {
    return null;
  }
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ResiliencePieChart(props) {
  const { data } = props;
  console.log(data);
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={'35%'}
          outerRadius={'75%'}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType='circle' layout='vertical' align='right' verticalAlign='middle' height={270}/>
      </PieChart>
    </ResponsiveContainer>
  );
}
