import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [_auth, _setAuth] = useState(null); // Set initial state to null to represent "loading"



  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      _setAuth(true);
    } else {
      _setAuth(false);
    }
    console.log('JWT FROM YO CONTEXT', jwt);
  }, [_auth]);

  return (
    <AuthContext.Provider value={{ _auth, _setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
