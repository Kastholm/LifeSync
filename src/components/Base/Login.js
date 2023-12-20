import React, { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginForm, openLoginForm] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");

  const appPassword = process.env.REACT_APP_LIFESYNC_PASSWORD;
  const appToken = process.env.REACT_APP_LIFESYNC_TOKEN;

  const checkPassword = () => {
    const password = appPassword;
    const storedToken = localStorage.getItem("access");

    if (storedToken && storedToken === appToken) {
      setLoginStatus(true);
      console.log('yove got token')
      return;
    }

    if (passwordInput === password) {
      console.log("logged in");
      setLoginStatus(true);
      localStorage.setItem("access", appToken);
    } else {
      console.log("password wrong");
      setLoginStatus(false);
    }
  };

  const testValues = {
    loginStatus,
    loginForm,
    openLoginForm,
    passwordInput,
    setPasswordInput,
    checkPassword,
  };

  return (
    <LoginContext.Provider value={testValues}>{children}</LoginContext.Provider>
  );
}

/* // Her laver vi vores egen magiske kasse ved navn SimpleContext. Vi lægger tallet 2 ind i denne kasse. Tallet 2 er bare et eksempel, det kunne være hvad som helst: et tal, en tekst, en liste af ting osv.


const SimpleContext = createContext(2);

//Tænk på useSimple som en speciallavet nøgle, der kun åbner SimpleContext-kassen. Når du bruger denne nøgle i en af dine legetøjskasser (komponenter), kan du få det, der er indeni - i dette tilfælde tallet 2.


export function useSimple() {
  return useContext(SimpleContext);
}

//SimpleProvider er som en stor krammebamse, der holder om alle dine yndlingslegetøjer (komponenter). Den fortæller dem, at de kan bruge den magiske kasse SimpleContext. Her siger vi, at alt inden i denne krammebamse kan bruge tallet 2, vi lagde i kassen.


export function SimpleProvider({ children }) {
  const contextText = 6; 

  //Her fortæller vi, at alt inden i krammebamsen (SimpleProvider) har adgang til den magiske kasse. children betyder alle de legetøjer (komponenter), der er inden i krammebamsen. Så de kan alle sammen bruge det, vi har lagt i kassen - tallet 2.
  
  
  return (
    <SimpleContext.Provider value={contextText}>
      {children}
    </SimpleContext.Provider>
  );
} */

//rfce
