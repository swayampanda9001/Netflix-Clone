import React from "react";
import "./index.css";
import Home from "./pages/home/home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={< Player/>} />

      </Routes>
    </div>
  );
}

export default App;
