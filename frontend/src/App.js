import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffList from './components/StaffList';  // StaffList என்ற காம்போனெண்டை இறக்குமதி செய்கிறேன்
import AddStaff from './components/AddStaff';    // AddStaff என்ற காம்போனெண்டை இறக்குமதி செய்கிறேன்
import UpdateStaff from './components/UpdateStaff';  // UpdateStaff என்ற காம்போனெண்டை இறக்குமதி செய்கிறேன்

function App() {
  return (
    <Router>
      <div>
        <h1>சிறந்த பணியாளர்கள் மேலாண்மை அமைப்பு</h1>
        <Routes>
          {/* UpdateStaff காம்போனெண்டை path "/update/:id" என்ற பாதையில் காட்டுகிறது */}
          <Route path="/update/:id" element={<UpdateStaff />} />
          {/* AddStaff காம்போனெண்டை path "/add" என்ற பாதையில் காட்டுகிறது */}
          <Route path="/add" element={<AddStaff />} />
          {/* StaffList காம்போனெண்டை "/" என்ற பாதையில் காட்டுகிறது */}
          <Route path="/" exact element={<StaffList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
