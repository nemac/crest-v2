import React from "react";
import PropTypes from "prop-types";

export default function ChartCustomLabels(props) {
  const {
    x,
    y,
    payload,
    width,
    visibleTicksCount,
    chartData,
    setChartDescription,
    setChartLabel,
    setChartDescriptionFor,
  } = props;
  const slot = width && visibleTicksCount ? width / visibleTicksCount : 60;
  const fontSize = slot < 44 ? 7 : 8;
  const maxChars = Math.floor(slot / (fontSize * 0.55));
  const words = (payload.value.match(/\b(\w+)\b/g) ?? []).flatMap((word) => {
    if (word.length <= maxChars) return [word];
    const mid = Math.ceil(word.length / 2);
    return [`${word.slice(0, mid)}-`, word.slice(mid)];
  });
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
          style={{
            cursor: "pointer",
            fontSize: `${fontSize}px`,
            padding: "10px",
          }}
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
  width: PropTypes.number,
  visibleTicksCount: PropTypes.number,
  setChartLabel: PropTypes.func,
  setChartDescription: PropTypes.func,
  setChartDescriptionFor: PropTypes.func,
  chartData: PropTypes.array,
};
