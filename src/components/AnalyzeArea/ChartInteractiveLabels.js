import React from 'react';

export default function ChartInteractiveLabels(props) {
  const {
    x, y, stroke, payload
  } = props;
  const words = payload.value.match(/\b(\w+)\b/g);
  const textWithOffset = {};
  const vertHeight = 10;
  words.map((word, index) => getText(textWithOffset, word, index, vertHeight));

  return (
        <g transform={`translate(${x},${y})`} onClick={() => console.log(test)}>
            {Object.entries(textWithOffset).map(([word, offset]) => <text key={word} x={0} y={0} dy={16} style={{ fontSize: '10px' }} textAnchor="middle" fill="#FFF">
                <tspan textAnchor="middle" x="0" dy={offset}>{word}</tspan>
            </text>)}
        </g>
  );
}
function getText(textWithOffset, word, index, vertHeight) {
  textWithOffset[word] = index * vertHeight;
}
