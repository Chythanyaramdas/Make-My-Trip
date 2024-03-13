import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import StaffRoute from"./routes/StaffRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/*" element={<UserRoute />} />
        <Route exact path="/staff/*" element={<StaffRoute/>}/>
      </Routes>
    </div>
  );
}

export default App;
