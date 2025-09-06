import React from "react";
import "./index.css";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import SearchPage from "./pages/Search/Search";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <MovieProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </div>
    </MovieProvider>
  );
}

export default App;
