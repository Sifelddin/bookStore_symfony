import React, { useEffect, useContext, useState, useMemo } from 'react';
import fetchData from '../hooks';

const authContext = React.createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [authUser, setAuthUser] = useState({ loading: true, data: undefined });
  useEffect(() => {
    fetchData('/api/me', setAuthUser);
  }, []);

  const user = useMemo(() => {
    return authUser;
  }, [authUser]);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContext;
