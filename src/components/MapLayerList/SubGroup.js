import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Layer from './Layer';

export default function SubGroup(props) {
  const { subHeading, subLayers } = props;

  const buildSubListings = () => (
    subLayers.map((layer) => <Layer key={layer.id} lData={layer} />)
  );

  return (
        <Fragment>
            <h4>{subHeading}</h4>
            {buildSubListings(subHeading)}
        </Fragment>
  );
}

SubGroup.propTypes = {
  subLayers: PropTypes.array.isRequired,
  subHeading: PropTypes.string.isRequired
};
