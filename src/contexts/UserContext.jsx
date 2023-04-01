import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('nameUser'));

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('nameUser', user);
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem('nameUser');
  };

  const value = { user, saveUser, removeUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
