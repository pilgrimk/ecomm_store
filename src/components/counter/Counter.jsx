import React, { useState } from 'react';

const Counter = ({ initialCount = 0, min = 0, max = Infinity, setQuantity }) => {
  const [count, setCount] = useState(initialCount);

  const decrement = () => {
    setQuantity(Math.max(min, count - 1));
    setCount(prevCount => Math.max(min, prevCount - 1));
  };

  const increment = () => {
    setQuantity(Math.min(max, count + 1));
    setCount(prevCount => Math.min(max, prevCount + 1));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decrement}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        -
      </button>
      <span className="px-4 py-1 bg-gray-100 text-gray-800">
        {count}
      </span>
      <button
        onClick={increment}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        +
      </button>
    </div>
  );
};

export default Counter;