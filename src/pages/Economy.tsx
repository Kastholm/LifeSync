import React, { useContext } from "react";
import Months from "../components/layouts/Economy/Months.tsx";
import { EconomyProvider } from "../components/layouts/Economy/EconomyContext.tsx";
import { LoginContext } from "../components/Base/Login.js";
import LoginForm from "../components/Base/LoginForm.js";

function Economy() {
  const { loginStatus } = useContext(LoginContext)
  return (
    <div className="relative ">
      <EconomyProvider>
        <Months />
      </EconomyProvider>
      {/* {
        loginStatus ? (

        ) 
        : (
          <div> <LoginForm />  </div>
        )
      } */}
    </div>
  );
}

export default Economy;
