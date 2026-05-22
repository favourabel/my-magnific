 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages_men/Homepage";
import Loginpage from "./pages_men/Loginpage";
import Signuppage from "./pages_men/Signuppage";

const App = () => {
  return (
     <div>

     
    
      <Routes>
          <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Signup" element={<Signuppage />} />
      </Routes>

    </div>
  );
};

export default App;