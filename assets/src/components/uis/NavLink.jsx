import React from 'react';
import LinkSpan from './LinkSpan';

const NavLink = ({ link, children }) => {
 
  return (
    <a href={link}>
      <LinkSpan> {children}</LinkSpan>
    </a>
  );
};

export default NavLink;
