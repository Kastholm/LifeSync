import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.js";
import { jwtDecode } from 'jwt-decode';

import Tsparticles from "../tools/particles.js";

function LoginScreen() {
  
  const { auth, setAuth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const serverurl = process.env.REACT_APP_SERVER_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const authUser = () => {
    fetch(`${serverurl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setAuth(true);
        const decoded = jwtDecode(data.token);
        localStorage.setItem("userId", decoded.userId);
        localStorage.setItem("userName", decoded.userName);
        console.log("User logged in successfully");
      })
      .catch((error) => {
        console.error("Error while logging in:", error);
        setAuth(false);
      });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <Tsparticles />
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img width="150" alt="" srcset="" />
            <p> Logo</p>
            <h1 className="mb-2 text-2xl">LifeSync</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                onClick={() => authUser()}
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
