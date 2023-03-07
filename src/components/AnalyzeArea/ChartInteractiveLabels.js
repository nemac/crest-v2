import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

export default function ChartInteractiveLabels(props) {
  const {
    x, y, stroke, payload
  } = props;
  const [showTip, setShowTip] = useState(false);
  const words = payload.value.match(/\b(\w+)\b/g);
  const textWithOffset = {};
  const vertHeight = 10;
  words.map((word, index) => getText(textWithOffset, word, index, vertHeight));

  if (showTip) {
    return (
        <g transform={`translate(${x},${y})`} onMouseLeave={() => setShowTip(false)}>
            
      
            {Object.entries(textWithOffset).map(([word, offset]) => <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{payload.value}</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing explanation'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      ><text key={word} x={0} y={8} dy={16} style={{ fontSize: '10px' }} textAnchor="middle" fill="#FFF">
                <tspan textAnchor="middle" x="0" dy={offset}>{word}
                </tspan>
                
            </text></HtmlTooltip>)
            }
        </g>
  );
  } else {
    return (
        <g transform={`translate(${x},${y})`} onMouseEnter={() => setShowTip(true)}>
            {Object.entries(textWithOffset).map(([word, offset]) => <text key={word} x={0} y={8} dy={16} style={{ fontSize: '10px' }} textAnchor="middle" fill="#FFF">
                <tspan textAnchor="middle" x="0" dy={offset}>{word}</tspan>
            </text>)}
        </g>
  );
  }
  
}
function getText(textWithOffset, word, index, vertHeight) {
  textWithOffset[word] = index * vertHeight;
}

ChartInteractiveLabels.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    stroke: PropTypes.string,
    payload: PropTypes.object
  };