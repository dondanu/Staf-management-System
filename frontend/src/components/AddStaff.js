import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import செய்கிறேன்

const AddStaff = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Navigate to other pages after form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStaff = { name, role };

    axios.post('http://localhost:5000/api/staff', newStaff)
      .then(() => {
        navigate('/');  // Successful submission, navigate back to staff list
      })
      .catch((error) => {
        console.error('Error adding staff:', error);
      });
  };

  return (
    <div>
      <h1>Add New Staff</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaff;
