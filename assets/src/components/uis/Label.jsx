import React from 'react';

const Label = ({ labelfeild, children }) => {
  return (
    <label
      className='block text-md font-medium text-gray-700'
      htmlFor={labelfeild}>
      {children}
    </label>
  );
};

export default Label;
