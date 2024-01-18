import React, { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginForm, openLoginForm] = useState(true);

  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const appPassword = process.env.REACT_APP_LIFESYNC_PASSWORD;
  const appToken = process.env.REACT_APP_LIFESYNC_TOKEN;

  const serverurl = process.env.REACT_APP_SERVER_URL;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${serverurl}/get/users`);
        const json = await res.json();
        setUsers(json);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const checkPassword = () => {
    const storedToken = localStorage.getItem("access");
    console.log(userInput, passwordInput);
    console.log("users", users);
    if (storedToken && storedToken === appToken) {
      setLoginStatus(true);
      console.log("yove got token");
      return;
    }
    users.find((user) => {
      if (userInput === user.username && passwordInput === user.password) {
        console.log("password match");
        localStorage.setItem("user", user.username);
        localStorage.setItem("access", appToken);
        setLoginStatus(true);
        window.location.reload();
      } else {
        console.log("password wrong");
        setLoginStatus(false);
      }
    });
  };

  const testValues = {
    loginStatus,
    loginForm,
    openLoginForm,
    userInput,
    setUserInput,
    passwordInput,
    setPasswordInput,
    checkPassword,
  };

  return (
    <LoginContext.Provider value={testValues}>{children}</LoginContext.Provider>
  );
}

//rfce
