import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { useEffect } from "react";

//Components
import Header from "./components/Base/Header";
import Dashboard from "./pages/Dashboard";
import Webtify from "./pages/Webtify";
import Movies from "./pages/Movies";
import { LoginContext, LoginProvider } from "./components/Base/Login";
import Economy from "./pages/Economy.tsx";
import Homeassistant from "./pages/Homeassistant.tsx";
function App() {
  return (
    <div className="App">
      <main className="flex">
        <Header />
        <LoginProvider>
          <div className="mx-auto w-[95vw]">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/webtify" element={<Webtify />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/economy" element={<Economy />} />
              <Route path="/homeassistant" element={<Homeassistant />} />
            </Routes>
          </div>
        </LoginProvider>
      </main>
    </div>
  );
}

export default App;
