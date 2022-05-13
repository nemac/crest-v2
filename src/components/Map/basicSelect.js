import React from 'react'

export function BasicSelect(props) {
  
  let data = Array.from(props.values) ;

  return (
    <select defaultValue={props.defaultValue} onChange={props.onChange}>
      {
        data.map((element, key) => <option key={key} value={element}>{element}</option>) 
      };
    </select>
  );
}