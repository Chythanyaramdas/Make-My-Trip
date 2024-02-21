import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/*" element={<UserRoute />} />
      </Routes>
    </div>
  );
}

export default App;
