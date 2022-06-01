import React from 'react';
import PropTypes from 'prop-types';

export function BasicSelect(props) {
  const { defaultValue, onChange, values } = props;
  const data = Array.from(values);

  // TODO: width will need to be adjusted when we move the region selector to the map layer list
  return (
    <div style={{ height: '36px', padding: '3px', width: '100%' }}>
      <select defaultValue={defaultValue} onChange={onChange} style={{ height: '100%', width: '100%' }}>
        {
          data.map((element, key) => <option key={key} value={element}>{element}</option>)
        };
      </select>
    </div>
  );
}

BasicSelect.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
