import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { useEffect, useContext } from "react";

import { AuthContext } from "./components/Auth/AuthProvider.js";


//Components
import Header from "./components/Base/Header";
import Dashboard from "./pages/Dashboard";
import Webtify from "./pages/Webtify";
import Movies from "./pages/Movies";
import Economy from "./pages/Economy.tsx";
import Homeassistant from "./pages/Homeassistant.tsx";
import Notebook from "./pages/Notebook.tsx";
import GoogleFit from "./pages/GoogleFit.tsx";
import Timer from "./components/tools/Timer.tsx";
import BookShelf from "./pages/BookShelf.tsx";
import LoginScreen from "./components/Auth/LoginScreen.js";

function App() {

  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div className="App">
      {
        auth === true ? (
      <main className="flex">
        <Header />
        <Timer />
          <div className="mx-auto ml-[5vw] w-[95vw]">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/webtify" element={<Webtify />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/economy" element={<Economy />} />
              <Route path="/notebook" element={<Notebook />} />
              <Route path="/googlefit" element={<GoogleFit />} />
              <Route path="/bookshelf" element={<BookShelf />} />
              <Route path="/homeassistant" element={<Homeassistant />} />
            </Routes>
          </div>
      </main>

        ) : <LoginScreen />
      }
    </div>
  );
}

export default App;
