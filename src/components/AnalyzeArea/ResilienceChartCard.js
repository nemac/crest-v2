import React from 'react';
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { mapConfig } from '../../configuration/config';
import PropTypes from 'prop-types';

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

export default function ResilienceChartCard(props) {
  const { chartData } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={200}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType='circle' layout='vertical' align='right' verticalAlign='middle' height={270}/>
      </PieChart>
    </ResponsiveContainer>
  );
}

ResilienceChartCard.propTypes = {
  boxHeight: PropTypes.string.isRequired,
  boxMarginTop: PropTypes.string,
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};