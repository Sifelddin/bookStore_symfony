import React from 'react';

const ErrorSpan = ({ children }) => {
  return <span className="text-red-600 text-sm"> {children} </span>;
};

export default ErrorSpan;
