import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ChartCustomLabels(props) {
  const {
    x, y, stroke, payload
  } = props;
  const words = payload.value.match(/\b(\w+)\b/g);
  const textWithOffset = {};
  const vertHeight = 10;
  const getText = (textWithOffset, word, index, vertHeight) => {
    textWithOffset[word] = index * vertHeight;
  }
  words.map((word, index) => getText(textWithOffset, word, index, vertHeight));

  return (
    <g transform={`translate(${x},${y})`}>
      {Object.entries(textWithOffset).map(([word, offset]) => <text key={word} x={0} y={8} dy={16} style={{ fontSize: '10px' }} textAnchor="middle" fill="#FFF">
        <tspan textAnchor="middle" x="0" dy={offset}>{word}</tspan>
      </text>)}
    </g>
  );
}

ChartCustomLabels.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  stroke: PropTypes.string,
  payload: PropTypes.object
};
