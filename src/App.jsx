
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"; 
import CampaignCreation from "./pages/CampaignCreation";
import CampaignHistory from "./pages/CampaignHistory";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/campaign-creation" element={<CampaignCreation />} /> 
        <Route path="/campaign-history" element={<CampaignCreation />} /> 

      </Routes>
    </Router>
  );
}

export default App;


