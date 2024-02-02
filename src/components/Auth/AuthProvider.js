import React, { createContext, useEffect, useState } from "react";


export const AuthContext = createContext({});

export function AuthProvider({ children }) {
 
useEffect(() => { 
  const token = localStorage.getItem("token");
  if (token) {
    setAuth(true);
  } else {
    setAuth(false);
  }
}, []);

 const [auth, setAuth] = useState({});

 const AuthContextData = {
    auth,
    setAuth
}

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
}
