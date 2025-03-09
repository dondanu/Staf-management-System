import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link import செய்கிறேன்

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    // Backend API ஐ அழைத்து staff பட்டியலை பெறுகிறேன்
    axios.get('http://localhost:5000/api/staff')
      .then((response) => {
        setStaff(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff:', error);
      });
  }, []);

  // Staff நீக்குதல் செயல்பாடு
  const deleteStaff = (id) => {
    axios.delete(`http://localhost:5000/api/staff/${id}`)
      .then(() => {
        setStaff(staff.filter((s) => s._id !== id));  // UI-யை புதுப்பிக்க
      })
      .catch((error) => {
        console.error('Error deleting staff:', error);
      });
  };

  return (
    <div>
      <h1>Staff List</h1>
      <Link to="/add">
        <button>Add Staff</button>
      </Link>
      <ul>
        {staff.map((s) => (
          <li key={s._id}> {/* MongoDB _id பயன்படுத்தவும் */}
            {s.name} - {s.role}
            {/* Update Button */}
            <Link to={`/update/${s._id}`}>
              <button>Update</button>
            </Link>
            {/* Delete Button */}
            <button onClick={() => deleteStaff(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
