import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.js";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Tsparticles from "../tools/particles.js";

function LoginScreen() {
  const { auth, setAuth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const serverurl = process.env.REACT_APP_SERVER_URL;

  const [welcomeMessage, setWelcomeMessage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const secretKey = process.env.REACT_APP_LIFESYNC_TOKEN;

  const authUser = async () => {
    try {
      const response = await fetch(`${serverurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credential s");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setAuth(true);
      const decoded = jwtDecode(data.token);
      localStorage.setItem("userId", decoded.userId);
      localStorage.setItem("userName", decoded.userName);

      await loginCount();
    } catch (error) {
      console.error("Error while logging in:", error);
      setAuth(false);
    }
  };

  const loginCount = async () => {
    try {
      const response = await fetch(
        `${serverurl}/get/user/${localStorage.getItem("userId")}`
      );
      const data = await response.json();
      if (data && data.length > 0 && data[0].loginCounter === 0) {
        await addUserEnv();
        localStorage.setItem("newUser", 1);
      } else {
        localStorage.setItem("newUser", 0);
        window.location.reload();
      }
      await increaseLoginCount(data[0].loginCounter);
    } catch (error) {
      console.error("Error in loginCount:", error);
    }
  };

  const increaseLoginCount = async (loginCountInc) => {
    try {
      await fetch(
        `${serverurl}/put/userlogincount/${localStorage.getItem("userId")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginCounter: loginCountInc + 1,
          }),
        }
      );
    } catch (error) {
      console.error("Error in increaseLoginCount:", error);
    }
  };

  const addUserEnv = async () => {
    try {
      const response = await fetch(`${serverurl}/post/userenv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habiticaID: "",
          habiticaToken: "",
          traktClientId: "",
          traktClientSecret: "",
          TMDBApiKey: "",
          YouTubeApiKey: "",
          YouTubePlaylistId: "",
          userId: localStorage.getItem("userId"),
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error in addUserEnv:", error);
    }
  };

  const registerUser = () => {
    Swal.fire({
      title: "Register your user",
      html: `
        <input id="username" class="swal2-input" placeholder="Your Name">
        <input id="email" class="swal2-input" type="email" placeholder="Your E-mail">
        <input id="password" class="swal2-input" type="text" placeholder="Your Password">
        <input id="secret" class="swal2-input" type="text" placeholder="Secret Key">
      `,
      preConfirm: () => {
        return {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          secretKey: document.getElementById("secret").value,
        };
      },
    }).then((result) => {
      console.log("indskrevet secret", result.value.secretKey);
      console.log("indhentet secret", secretKey)
      if (result.value.secretKey !== secretKey) {
        Swal.fire({
          title: "Invalid Secret Key",
          text: "Please enter the correct secret key",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      if (result.isConfirmed) {
        Swal.fire({
          title: "User registered",
          text: "You can now login",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetch(`${serverurl}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: result.value.username,
            email: result.value.email,
            password: result.value.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <Tsparticles />
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img width="150" alt=""  />
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
            <div className="mt-8 flex gap-4 justify-center text-lg text-black">
              <button
                onClick={() => authUser()}
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
              <button
                onClick={() => registerUser()}
                className="rounded-3xl bg-blue-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
