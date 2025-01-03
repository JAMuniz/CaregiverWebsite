import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Sign from './sign.js';
import Login from './Login.js';
import Welcome from './Welcome.js';
import UpdateInfo from './updateInfo.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/updateinfo" element={<UpdateInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
