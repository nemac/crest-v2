import React from 'react';

const EditButton = ({ onStartEditing }) => {
  return (
    <button onClick={onStartEditing}>Start Editing</button>
  );
};

export default EditButton;