import React, { useEffect, useContext, useState } from 'react';
import fetchData from '../hooks';

const authContext = React.createContext();
const booksStorage = React.createContext();
const orderStorage = React.createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const OrderContext = ({ children }) => {
  const [user, setUser] = useState({ loading: true, data: null });
  useEffect(() => {
    fetchData('/api/me', setUser);
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default OrderContext;
