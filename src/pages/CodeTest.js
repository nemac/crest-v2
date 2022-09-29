// This is just for code testing snippet purposes.
// Can delete when ready for production
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CodeTest() {
  const [searchParams, setSearchParams] = useSearchParams();

  const removeErrorParam = () => {
    if (searchParams.has('error')) {
      searchParams.delete('error');
      setSearchParams(searchParams);
    }
  };

  return <button onClick={removeErrorParam}>Remove error param</button>;
}
