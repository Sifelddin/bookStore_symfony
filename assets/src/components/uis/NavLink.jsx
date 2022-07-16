import React from 'react';
import LinkSpan from './LinkSpan';

const NavLink = ({ link, children }) => {
  console.log(link);
  return (
    <a href={link}>
      <LinkSpan> {children}</LinkSpan>
    </a>
  );
};

export default NavLink;
