import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/authorize" element={<Body />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
