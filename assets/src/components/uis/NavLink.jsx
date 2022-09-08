import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/OrderContext';
import LinkSpan from './LinkSpan';

const NavLink = ({ link, children }) => {
  const { data } = useAuth();
  if (!data) {
    // remove order from localStorage if the user is not logged in
    localStorage.removeItem('ORDER');
  }
  if (data) {
    return (
      <Link to={link}>
        <LinkSpan>{children}</LinkSpan>
      </Link>
    );
  }
  return (
    <a href={link}>
      <LinkSpan> {children}</LinkSpan>
    </a>
  );
};

export default NavLink;
