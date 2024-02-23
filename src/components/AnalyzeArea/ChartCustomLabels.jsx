import React from "react";
import PropTypes from "prop-types";

export default function ChartCustomLabels(props) {
  const {
    x,
    y,
    payload,
    chartData,
    setChartDescription,
    setChartLabel,
    setChartDescriptionFor,
  } = props;
  const words = payload.value.match(/\b(\w+)\b/g);
  const textWithOffset = {};
  const vertHeight = 12;
  const getText = (textWithOffsetText, word, index, vertHeightText) => {
    // eslint-disable-next-line no-param-reassign
    textWithOffsetText[word] = index * vertHeightText;
  };
  words.map((word, index) => getText(textWithOffset, word, index, vertHeight));

  const handleClick = () => {
    const selectedLayerData = chartData.find(
      (layer) => layer.selectedChartLabel === payload.value,
    );
    setChartDescriptionFor(selectedLayerData.chartType);
    setChartDescription(selectedLayerData.selectChartLabelDescription);
    setChartLabel(selectedLayerData.selectedChartLabel);
  };

  return (
    <g
      transform={`translate(${x},${y})`}
      overflow="visible"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      {Object.entries(textWithOffset).map(([word, offset]) => (
        <text
          key={`${word}-${Math.random()}`}
          x={0}
          y={8}
          dy={vertHeight}
          style={{ cursor: "pointer", fontSize: "8px", padding: "10px" }}
          textAnchor="middle"
          fill="#FFFFFF"
          onClick={handleClick}
        >
          <tspan
            textAnchor="middle"
            x="0"
            dy={offset}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            {word}
          </tspan>
        </text>
      ))}
    </g>
  );
}

ChartCustomLabels.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  setChartLabel: PropTypes.func,
  setChartDescription: PropTypes.func,
  setChartDescriptionFor: PropTypes.func,
  chartData: PropTypes.array
};
