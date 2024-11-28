import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');

  const updateName = (newName) => {
    setName(newName);
    if (newName) {
        localStorage.setItem('name', newName);
      } else {
        localStorage.removeItem('name');
      }
  };

  return (
    <UserContext.Provider value={{ name, updateName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
