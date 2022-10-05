// This is just for code testing snippet purposes.
// Can delete when ready for production
import React from 'react';
import DialogPopup from '../components/All/DialogPopup';

export default function CodeTest() {
  const [a, setA] = React.useState(0);
  const [error, setError] = React.useState(false);

  const handleErrorMessageClose = () => {
    setError(false);
  };
  if (a === 5) {
    setError(true);
    setA(0);
  }
  if (error) {
    return (
      <DialogPopup
        contentMessage={'ERROR'}
        buttonMessage='Okay'
        onClose={handleErrorMessageClose}
        open={error}
      />
    );
  }
  return (
    <div>
      <button onClick={() => setA(a + 1)}>
        Increase
      </button> <br></br>
      Value of A: {a} <br></br>
      Error: {error}
    </div>
  );
}
