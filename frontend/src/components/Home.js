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
  const [staffId, setStaffId] = useState('');
  const [selectedStaffName, setSelectedStaffName] = useState(''); // To store the selected staff's name
  const [darkMode, setDarkMode] = useState(false); // To toggle dark and light modes
  const navigate = useNavigate(); // Hook for navigation

  // Fetching staff data, roles count, and leave requests on page load
  useEffect(() => {
    axios.get('http://localhost:5000/api/staff')
      .then((response) => {
        setStaff(response.data);
        const roles = {};
        response.data.forEach((s) => {
          roles[s.role] = roles[s.role] ? roles[s.role] + 1 : 1;
        });
        setRolesCount(roles);
      })
      .catch((error) => {
        console.error('Error fetching staff:', error);
      });

    axios.get('http://localhost:5000/api/staff/recent')
      .then((response) => {
        setRecentStaff(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent staff:', error);
      });

    axios.get('http://localhost:5000/api/leave')
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leave requests:', error);
      });
  }, []);

  const handleAddStaff = () => {
    const newStaff = { name, role };
    axios.post('http://localhost:5000/api/staff', newStaff)
      .then((response) => {
        setStaff([...staff, response.data]);
        setName('');
        setRole('');
      })
      .catch((error) => {
        console.error('Error adding staff:', error);
      });
  };

  const handleUpdateStaff = (id) => {
    const updatedStaff = { name, role };
    axios.put(`http://localhost:5000/api/staff/${id}`, updatedStaff)
      .then((response) => {
        setStaff(staff.map(s => s._id === id ? response.data : s));
        setName('');
        setRole('');
      })
      .catch((error) => {
        console.error('Error updating staff:', error);
      });
  };

  const handleDeleteStaff = (id) => {
    axios.delete(`http://localhost:5000/api/staff/${id}`)
      .then(() => {
        setStaff(staff.filter(s => s._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting staff:', error);
      });
  };

  const handleAddLeaveRequest = () => {
    const newLeave = { userId: staffId, leaveStartDate, leaveEndDate, reason };
    axios.post('http://localhost:5000/api/leave', newLeave)
      .then((response) => {
        setLeaveRequests([...leaveRequests, response.data]);
        setLeaveStartDate('');
        setLeaveEndDate('');
        setReason('');
        setStaffId('');
      })
      .catch((error) => {
        console.error('Error adding leave request:', error);
      });
  };

  const handleUpdateLeaveRequest = (id, status) => {
    axios.put(`http://localhost:5000/api/leave/${id}`, { status })
      .then((response) => {
        setLeaveRequests(leaveRequests.map((leave) => (leave._id === id ? response.data : leave)));
      })
      .catch((error) => {
        console.error('Error updating leave request:', error);
      });
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleStaffSelection = (e) => {
    const selectedStaff = staff.find(s => s._id === e.target.value);
    setSelectedStaffName(selectedStaff ? selectedStaff.name : ''); // Set selected staff name
  };

  const toggleMode = () => {
    const mode = prompt('Select Mode: dark or light');
    if (mode === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const goToAdminPage = () => {
    navigate('/admin'); // Redirect to Admin page
  };

  return (
    <div style={darkMode ? styles.darkContainer : styles.lightContainer}>
      <header style={styles.header}>
        <h1>Welcome to the Staff Management System</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <button onClick={toggleMode} style={styles.modeButton}>Mode</button>
        <button onClick={goToAdminPage} style={styles.adminButton}>Admin</button>
      </header>

      {/* Dashboard Section */}
      <h2 style={styles.sectionHeader}>Dashboard</h2>
      <div style={styles.dashboard}>
        <div style={styles.statBox}>
          <h3>Total Staff</h3>
          <p>{staff.length}</p>
        </div>

        <div style={styles.statBox}>
          <h3>Roles Breakdown</h3>
          <ul>
            {Object.entries(rolesCount).map(([role, count]) => (
              <li key={role} style={styles.listItem}>{role}: {count}</li>
            ))}
          </ul>
        </div>

        <div style={styles.statBox}>
          <h3>Recent Staff</h3>
          <ul>
            {recentStaff.map((s) => (
              <li key={s._id} style={styles.listItem}>{s.name} - {s.role}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Staff Management Section */}
      <h2 style={styles.sectionHeader}>Staff List</h2>
      <div style={styles.formGroup}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddStaff} style={styles.button}>Add New Staff</button>
      </div>

      <ul>
        {staff.map(s => (
          <li key={s._id} style={styles.listItem}>
            {s.name} - {s.role}
            <button onClick={() => handleUpdateStaff(s._id)} style={styles.button}>Update</button>
            <button onClick={() => handleDeleteStaff(s._id)} style={styles.button}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Leave Management Section */}
      <h2 style={styles.sectionHeader}>Request Leave</h2>
      <div style={styles.formGroup}>
        <select
          value={staffId}
          onChange={(e) => {
            setStaffId(e.target.value);
            handleStaffSelection(e);
          }}
          style={styles.input}
        >
          <option value="">Select Staff</option>
          {staff.map(s => (
            <option key={s._id} value={s._id}>{s.name} - {s.role}</option>
          ))}
        </select>
        <input
          type="date"
          value={leaveStartDate}
          onChange={(e) => setLeaveStartDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={leaveEndDate}
          onChange={(e) => setLeaveEndDate(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddLeaveRequest} style={styles.button}>Request Leave</button>
      </div>

      <h2 style={styles.sectionHeader}>Leave Requests</h2>
      <ul>
        {leaveRequests.map((leave) => (
          <li key={leave._id} style={styles.listItem}>
            <p>{selectedStaffName ? selectedStaffName : 'Unknown User'} requested leave from {leave.leaveStartDate} to {leave.leaveEndDate}</p>
            <p>Reason: {leave.reason}</p>
            <p>Status: {leave.status}</p>
            <button onClick={() => handleUpdateLeaveRequest(leave._id, 'Approved')} style={styles.button}>Approve</button>
            <button onClick={() => handleUpdateLeaveRequest(leave._id, 'Rejected')} style={styles.button}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline styles for the UI
const styles = {
  lightContainer: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  darkContainer: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  modeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  adminButton: {
    backgroundColor: '#3b5998',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  sectionHeader: {
    color: '#333',
    marginBottom: '10px',
  },
  dashboard: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  statBox: {
    width: '30%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  listItem: {
    margin: '8px 0',
    fontSize: '16px',
  },
  input: {
    display: 'block',
    width: '100%',
    margin: '10px 0',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
    transition: '0.3s',
  },
  formGroup: {
    marginBottom: '20px',
  },
};

export default Home;
