import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
