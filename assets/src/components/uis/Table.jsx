import React from 'react';

export const Th = ({ children }) => {
  return (
    <th
      scope="col"
      className="p-1 sm:px-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  );
};
export const Td = ({ children }) => {
  return <td className="p-1 sm:p-2 text-sm sm:text-base">{children}</td>;
};
