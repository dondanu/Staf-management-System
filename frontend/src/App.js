import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';  // Register காம்போனெண்டை இறக்குமதி செய்கிறேன்
import Login from './components/Login';  // Login காம்போனெண்டை இறக்குமதி செய்கிறேன்
import Home from './components/Home';  // Home காம்போனெண்டை இறக்குமதி செய்கிறேன்
import Admin from './components/Admin'; // Admin காம்போனெண்டை இறக்குமதி செய்கிறேன்
//import Welcome from './components/Welcome';  // Welcome காம்போனெண்டை இறக்குமதி செய்கிறேன்
//import Welcome from './components/Welcome';  // This should be the only import for Welcome.js
import Welcome from './components/Welcome2';  // Correct the file name if needed

function App() {
  return (
    <Router>
      <div>
        {/* Routing only happens here, no buttons in App.js */}
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
