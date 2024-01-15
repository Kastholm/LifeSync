import React, { useContext } from "react";

import { LoginContext } from "./Login";

function LoginForm() {
  const {
    loginForm,
    openLoginForm,
    userInput,
    setUserInput,
    password,
    passwordInput,
    setPasswordInput,
    checkPassword,
    loginStatus,
  } = useContext(LoginContext);
  console.log("loginForm", loginForm, password);
  return (
    <div>
      {loginForm && !loginStatus ? (
        <div className=" ">
          <div className=" mt-12 m-auto rounded-2xl ">
            <div className=" items-center justify-center  bg-cover bg-no-repeat">
              <div className="rounded-xl m-auto  bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 w-96 ">
                <div className="text-white">
                  <div className="mb-8 flex flex-col items-center">
                    <h1 className="mb-2 text-2xl">LifeSync</h1>
                    <span className="text-gray-300">
                      This content is hidden, login to proceed
                    </span>
                  </div>
                  <div>
                  <div className="mb-4 text-lg">
                      <input
                        className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit  placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                        type="username"
                        name="name"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="username"
                      />
                    </div>
                    <div className="mb-4 text-lg">
                      <input
                        className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit  placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                        type="Password"
                        name="name"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="password"
                      />
                    </div>
                    <div className="mt-8 flex justify-center text-lg text-black">
                      <button
                        onClick={() => checkPassword()}
                        className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LoginForm;
