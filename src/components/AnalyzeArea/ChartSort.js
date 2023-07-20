/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import './style.css';

export const ChartSort = ({
  className,
  displayClassName,
  regionClassName,
  overlapGroupClassName,
  hubsClassName,
  vectorClassName,
  vector = 'https://generation-sessions.s3.amazonaws.com/4f3040a399dc7d69bb97b9703d30cdc5/img/vector-7.svg',
  regionClassNameOverride,
  overlapClassName,
  communityExposureClassName,
  vectorClassNameOverride,
  img = 'https://generation-sessions.s3.amazonaws.com/4f3040a399dc7d69bb97b9703d30cdc5/img/vector-7.svg',
  overlapWrapperClassName,
  overlapClassNameOverride,
  fishWildlifeClassName,
  imgClassName,
  vector1 = 'https://generation-sessions.s3.amazonaws.com/4f3040a399dc7d69bb97b9703d30cdc5/img/vector-6.svg',
  headClassName,
  lineClassName,
  line = 'https://generation-sessions.s3.amazonaws.com/4f3040a399dc7d69bb97b9703d30cdc5/img/line-9-1.svg',
  overlapGroupClassNameOverride,
  sortClassName,
  imgClassNameOverride
}) => {
  const [charts, setCharts] = useState(['Hubs', 'Community Exposure', 'Wildlife']);
  return (
    <div className={`sort ${className}`}>
      <div className="main-menu-choice">
        <div className={`display ${displayClassName}`}>
            {charts.map((chart) => (
                <div key={chart} className={`overlap-group ${overlapGroupClassName}`}>
                    <div className={`hubs ${hubsClassName}`}>{chart}</div>
                    <img className={`vector ${vectorClassName}`} alt="Vector" src={vector} />
                </div>
            ))}
        </div>
        <div className={`head ${headClassName}`}>
          <img className={`line ${lineClassName}`} alt="Line" src={line} />
          <div className={`overlap ${overlapGroupClassNameOverride}`}>
            <div className={`div ${sortClassName}`}>Sort</div>
            <img
              className={`img ${imgClassNameOverride}`}
              alt="Vector"
              src="https://generation-sessions.s3.amazonaws.com/4f3040a399dc7d69bb97b9703d30cdc5/img/vector-5.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ChartSort.propTypes = {
  vector: PropTypes.string,
  img: PropTypes.string,
  vector1: PropTypes.string,
  line: PropTypes.string
};
