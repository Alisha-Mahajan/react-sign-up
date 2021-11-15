import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Parent from "./components/Parent";
import { INITIAL_VALUE } from "./immutables/constants";

export const CounterContext = React.createContext({ delta: INITIAL_VALUE });

function App() {
  return (
    <Router>
      <div>
        <CounterContext.Provider value={{ delta: 5 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Parent />} />
          </Routes>
        </CounterContext.Provider>
      </div>
    </Router>
  );
}

export default App;
