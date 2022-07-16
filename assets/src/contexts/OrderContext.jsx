import React, { useEffect, useContext, useState } from 'react';
import fetchData from '../hooks';

const authContext = React.createContext();
const booksStorage = React.createContext();
const orderStorage = React.createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const useBooksStorage = () => {
  return useContext(booksStorage);
};
export const useOrderStorage = () => {
  return useContext(orderStorage);
};

const OrderContext = ({ children }) => {
  const [user, setUser] = useState({ loading: true, data: null });
  useEffect(() => {
    fetchData('/api/me', setUser);
  }, []);

  return (
    <authContext.Provider value={user}>
      <booksStorage.Provider
        value={JSON.parse(localStorage.getItem('SHOPPING-CART'))}>
        <orderStorage.Provider
          value={JSON.parse(localStorage.getItem('ORDER'))}>
          {children}
        </orderStorage.Provider>
      </booksStorage.Provider>
    </authContext.Provider>
  );
};

export default OrderContext;
