import React from 'react'

export function BasicSelect(props) {
  return (
    <select defaultValue={props.defaultValue} onChange={props.onChange}>
      {
        props.values.map((element, key) => <option key={key} value={element}>{element}</option>)
      };
    </select>
  );
}