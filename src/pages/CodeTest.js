import React, { useState } from 'react';

function Counter(props) {
  const {
    count: [count, setCount]
  } = {
    count: useState(0),
    // eslint-disable-next-line react/prop-types
    ...(props.state || {})
  };

  return (
    <div>
      <h3>{count}</h3>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default function CodeTest() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2>Lifted state</h2>
      <Counter state={{ count: [count, setCount] }} />
      <Counter state={{ count: [count, setCount] }} />
      <h2>Isolated state</h2>
      <Counter />
    </div>
  );
}
