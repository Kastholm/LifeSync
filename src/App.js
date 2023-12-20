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
function App() {
  return (
    <div className="App">
      <main className="flex">
        <Header />
        <LoginProvider>
          <div className="mx-auto">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/webtify" element={<Webtify />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </div>
        </LoginProvider>
      </main>
    </div>
  );
}

export default App;
