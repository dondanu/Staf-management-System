import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Redirect for navigation

const Home = () => {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rolesCount, setRolesCount] = useState({});
  const [recentStaff, setRecentStaff] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Fetching staff data, roles count, and leave requests on page load
  useEffect(() => {
    // Fetch all staff data
    axios.get('http://localhost:5000/api/staff')
      .then((response) => {
        setStaff(response.data);

        // Calculate roles count
        const roles = {};
        response.data.forEach((s) => {
          roles[s.role] = roles[s.role] ? roles[s.role] + 1 : 1;
        });
        setRolesCount(roles);
      })
      .catch((error) => {
        console.error('Error fetching staff:', error);
      });

    // Fetch recent staff (last 5 added)
    axios.get('http://localhost:5000/api/staff/recent')
      .then((response) => {
        setRecentStaff(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent staff:', error);
      });

    // Fetch leave requests
    axios.get('http://localhost:5000/api/leave')
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leave requests:', error);
      });
  }, []);

  // Handle Add Staff
  const handleAddStaff = () => {
    const newStaff = { name, role };
    axios.post('http://localhost:5000/api/staff', newStaff)
      .then((response) => {
        setStaff([...staff, response.data]);  // Add new staff to list
        setName('');
        setRole('');
      })
      .catch((error) => {
        console.error('Error adding staff:', error);
      });
  };

  // Handle Update Staff
  const handleUpdateStaff = (id) => {
    const updatedStaff = { name, role };
    axios.put(`http://localhost:5000/api/staff/${id}`, updatedStaff)
      .then((response) => {
        setStaff(staff.map(s => s._id === id ? response.data : s));  // Update in staff list
        setName('');
        setRole('');
      })
      .catch((error) => {
        console.error('Error updating staff:', error);
      });
  };

  // Handle Delete Staff
  const handleDeleteStaff = (id) => {
    axios.delete(`http://localhost:5000/api/staff/${id}`)
      .then(() => {
        setStaff(staff.filter(s => s._id !== id));  // Remove staff from list
      })
      .catch((error) => {
        console.error('Error deleting staff:', error);
      });
  };

  // Handle Add Leave Request
  const handleAddLeaveRequest = () => {
    const newLeave = { leaveStartDate, leaveEndDate, reason };
    axios.post('http://localhost:5000/api/leave', newLeave)
      .then((response) => {
        setLeaveRequests([...leaveRequests, response.data]);
        setLeaveStartDate('');
        setLeaveEndDate('');
        setReason('');
      })
      .catch((error) => {
        console.error('Error adding leave request:', error);
      });
  };

  // Handle Update Leave Request Status
  const handleUpdateLeaveRequest = (id, status) => {
    axios.put(`http://localhost:5000/api/leave/${id}`, { status })
      .then((response) => {
        setLeaveRequests(leaveRequests.map((leave) => (leave._id === id ? response.data : leave)));
      })
      .catch((error) => {
        console.error('Error updating leave request:', error);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    navigate('/');  // Redirect to the login page
  };

  return (
    <div>
      <h1>Welcome to the Staff Management System</h1>

      {/* Dashboard Section */}
      <h2>Dashboard</h2>
      <div className="dashboard">
        <div className="stat-box">
          <h3>Total Staff</h3>
          <p>{staff.length}</p>
        </div>

        <div className="stat-box">
          <h3>Roles Breakdown</h3>
          <ul>
            {Object.entries(rolesCount).map(([role, count]) => (
              <li key={role}>{role}: {count}</li>
            ))}
          </ul>
        </div>

        <div className="stat-box">
          <h3>Recent Staff</h3>
          <ul>
            {recentStaff.map((s) => (
              <li key={s._id}>{s.name} - {s.role}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Staff Management Section */}
      <h2>Staff List</h2>
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handleAddStaff}>Add New Staff</button>
      </div>

      <ul>
        {staff.map(s => (
          <li key={s._id}>
            {s.name} - {s.role}
            <button onClick={() => handleUpdateStaff(s._id)}>Update</button>
            <button onClick={() => handleDeleteStaff(s._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Leave Management Section */}
      <h2>Request Leave</h2>
      <div>
        <input
          type="date"
          value={leaveStartDate}
          onChange={(e) => setLeaveStartDate(e.target.value)}
        />
        <input
          type="date"
          value={leaveEndDate}
          onChange={(e) => setLeaveEndDate(e.target.value)}
        />
        <textarea
          placeholder="Reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button onClick={handleAddLeaveRequest}>Request Leave</button>
      </div>

      <h2>Leave Requests</h2>
      <ul>
  {leaveRequests.map((leave) => (
    <li key={leave._id}>
      {/* Check if leave.userId and leave.userId.username are available */}
      <p>{leave.userId && leave.userId.username ? leave.userId.username : 'Unknown User'} requested leave from {leave.leaveStartDate} to {leave.leaveEndDate}</p>
      <p>Reason: {leave.reason}</p>
      <p>Status: {leave.status}</p>
      <button onClick={() => handleUpdateLeaveRequest(leave._id, 'Approved')}>Approve</button>
      <button onClick={() => handleUpdateLeaveRequest(leave._id, 'Rejected')}>Reject</button>
    </li>
  ))}
</ul>


      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Inline styles for the Dashboard */}
      <style jsx>{`
        .dashboard {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .stat-box {
          width: 30%;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .stat-box h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .stat-box ul {
          list-style: none;
          padding: 0;
        }

        .stat-box ul li {
          margin: 5px 0;
        }

        h1, h2 {
          text-align: center;
          color: #333;
        }

        input, textarea {
          display: block;
          margin: 10px 0;
          padding: 8px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 4px;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Home;
