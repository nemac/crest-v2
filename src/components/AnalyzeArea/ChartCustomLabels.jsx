import React from 'react';
import PropTypes from 'prop-types';

export default function ChartCustomLabels(props) {
  const {
    x, y, payload
  } = props;
  const words = payload.value.match(/\b(\w+)\b/g);
  const textWithOffset = {};
  const vertHeight = 10;
  const getText = (textWithOffsetText, word, index, vertHeightText) => {
    // eslint-disable-next-line no-param-reassign
    textWithOffsetText[word] = index * vertHeightText;
  };
  words.map((word, index) => getText(textWithOffset, word, index, vertHeight));
  return (
    <g transform={`translate(${x},${y})`}>
      {Object.entries(textWithOffset).map(([word, offset]) => <text key={`${word}-${Math.random()}`} x={0} y={8} dy={16} style={{ fontSize: '8px' }} textAnchor="middle" fill="#FFFFFF">
        <tspan textAnchor="middle" x="0" dy={offset}>{word}</tspan>
      </text>)}
    </g>
  );
}

ChartCustomLabels.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object
};
