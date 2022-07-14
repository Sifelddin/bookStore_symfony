import React from 'react';

const NavLink = ({ link, children }) => {
  console.log(link);
  return (
    <a
      className='underline text-gray-700 hover:text-black mx-2 p-1'
      href={link}>
      {children}
    </a>
  );
};

export default NavLink;
