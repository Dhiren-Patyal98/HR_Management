import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/index.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import "./App.css";

import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <div>
                  <Dashboard />
                </div>
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
