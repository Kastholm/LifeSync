import React, { useContext } from "react";
import Months from "../components/layouts/Economy/Months.tsx";
/* import { EconomyProvider } from "../components/layouts/Economy/EconomyContext.tsx"; */
import EconomyNew from "../components/layouts/Economy/EconomyNew.js";

function Economy() {
  return (
    <div className="relative ">
      {/* <EconomyProvider> */}
        <EconomyNew />
      {/* </EconomyProvider> */}
     
    </div>
  );
}

export default Economy;
