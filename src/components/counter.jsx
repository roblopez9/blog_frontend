// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import useStore from '../store';

function Counter(props) {
  const counter = useStore((state) => state.count);
  return (
    <div>
      Current Count: { counter }
    </div>
  );
}

export default Counter;
