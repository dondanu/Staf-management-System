import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // useParams & useNavigate import செய்கிறேன்

const UpdateStaff = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const { id } = useParams();  // URL இல் இருந்து id பெற
  const navigate = useNavigate();  // Navigate after updating

  useEffect(() => {
    // Backend API ஐ அழைத்து current staff details ஐ பெறுகிறேன்
    axios.get(`http://localhost:5000/api/staff/${id}`)
      .then((response) => {
        setName(response.data.name);
        setRole(response.data.role);
      })
      .catch((error) => {
        console.error('Error fetching staff:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStaff = { name, role };

    axios.put(`http://localhost:5000/api/staff/${id}`, updatedStaff)
      .then(() => {
        navigate('/');  // Update செய்யும் பின் staff list page-க்கு செல்லவும்
      })
      .catch((error) => {
        console.error('Error updating staff:', error);
      });
  };

  return (
    <div>
      <h1>Update Staff</h1>
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
        <button type="submit">Update Staff</button>
      </form>
    </div>
  );
};

export default UpdateStaff;
