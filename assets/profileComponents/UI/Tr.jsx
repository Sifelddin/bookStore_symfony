import React from 'react';

const Tr = ({ th, td }) => {
  return (
    <tr>
      <th class='text-xs text-left uppercase'>{th}</th>
      <td class='text-sm text-left'>{td}</td>
    </tr>
  );
};

export default Tr;
