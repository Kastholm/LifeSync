import "./App.css";
import { Route, Routes } from "react-router-dom";

//Components
import Header from "./components/Base/Header";
import Dashboard from "./pages/Dashboard";
import Webtify from "./pages/Webtify";

function App() {
  return (
    <div className="App">
      <main className="flex">
        <Header />
        <div className="mx-auto">
          <Routes >
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/webtify" element={<Webtify />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
