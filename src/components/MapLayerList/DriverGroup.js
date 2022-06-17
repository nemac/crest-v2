import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Layer from './Layer';
import { toggleCollapsed } from '../../reducers/mapLayerListSlice';

export default function DriverGroup(props) {
  const dispatch = useDispatch();
  const { chartInputLabel, chartLayerList } = props;
  const expandedChartsSelector = (state) => state.mapLayerList.expandedCharts;
  const expandedCharts = useSelector(expandedChartsSelector);
  const isExpanded = expandedCharts.includes(chartInputLabel);

  const onClick = () => {
    dispatch(toggleCollapsed(chartInputLabel));
  };

  return (
    <Accordion expanded={isExpanded} onChange={onClick}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{chartInputLabel}</Typography>
        </AccordionSummary>
        {chartLayerList.map((layer) => <Layer key={layer.id} lData={layer}/>)}
      </Accordion>
  );
}

DriverGroup.propTypes = {
  chartInputLabel: PropTypes.string.isRequired,
  chartLayerList: PropTypes.array.isRequired
};
