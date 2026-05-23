 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages_mess/Homepage";
import Loginpage from "./pages_mess/Loginpage";
import Signuppage from "./pages_mess/Signuppage";
import Dashboard from "./pages_mess/Dashboardpage";

const App = () => {
  return (
     <div>

     
    
      <Routes>
          <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
};

export default App;