import React from 'react';

const LinkSpan = ({ children }) => {
  return (
    <span className='underline text-gray-700 hover:text-black mx-1 p-1'>
      {children}
    </span>
  );
};

export default LinkSpan;
