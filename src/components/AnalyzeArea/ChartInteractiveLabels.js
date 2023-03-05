import React from 'react';

export default function ChartInteractiveLabels(props) {
  const {
    x, y, stroke, payload
  } = props;
  return (
        <g transform={`translate(${x},${y})`} onClick={() => console.log(payload.value)}>
            <text x={0} y={0} dy={16} style={{ fontSize: '10px' }} textAnchor="middle" fill="#FFF">
                {payload.value}
            </text>
        </g>
  );
}
