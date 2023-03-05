import React from 'react';

export default function ChartInteractiveLabels(props) {
  console.log('inside interactive label...');
  const {
    x, y, stroke, payload
  } = props;
  return (
        <g transform={`translate(${x},${y})`} onClick={() => console.log(payload.value)}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
  );
}
