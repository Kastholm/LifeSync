import React, { useContext } from "react";
import Months from "../components/layouts/Economy/Months.tsx";
import { EconomyProvider } from "../components/layouts/Economy/EconomyContext.tsx";

function Economy() {
  return (
    <div className="relative ">
      <EconomyProvider>
        <Months />
      </EconomyProvider>
     
    </div>
  );
}

export default Economy;
