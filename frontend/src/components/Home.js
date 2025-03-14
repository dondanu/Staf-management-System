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
  const [searchQuery, setSearchQuery] = useState(''); // Added search state
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
    setDarkMode(mode === 'dark');
  };

  const goToAdminPage = () => {
    navigate('/admin'); // Redirect to Admin page
  };

  // Handle search query for staff
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered staff based on search query
  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Duplicate the logos for seamless scrolling effect
    const carouselWrapper = document.getElementById("carousel-wrapper");
    const items = carouselWrapper.children;
    const itemCount = items.length;

    // Duplicate logos for seamless looping
    for (let i = 0; i < itemCount; i++) {
      const clone = items[i].cloneNode(true);
      carouselWrapper.appendChild(clone);
    }
  }, []);

  return (
    <div style={darkMode ? styles.darkContainer : styles.lightContainer}>
      <header style={styles.header}>
        <h1>Staff Management System</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <button onClick={toggleMode} style={styles.modeButton}>Mode</button>
        <input
          type="text"
          placeholder="Search Staff"
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <button onClick={goToAdminPage} style={styles.adminButton}>Admin</button>
      </header>

      {/* Introductory Section */}
      <section style={styles.introSection}>
        <h2>Welcome to the Staff Management System</h2>
        <p>
          Our staff management system helps you efficiently manage staff data, 
          leave requests, roles, and more. With easy navigation and dynamic 
          features, you can handle your organization’s staffing needs with ease.
        </p>
      </section>

      {/* Logo Carousel Section */}
      <section className="carousel-container" style={styles.carouselContainer}>
        <h2 className="carousel-title" style={styles.carouselTitle}>Modern, fast-growing, global businesses love Bob</h2>
        <div className="carousel-wrapper" id="carousel-wrapper" style={styles.carouselWrapper}>
          {/* Logos */}
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_550,h_64,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/VaynerMedia-black.png" alt="Vayner Media logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_550,h_99,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Multi-Media-LLC-black.png" alt="Multi Media LLC logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_550,h_105,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/What3words-black.png" alt="What3words logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_74,h_100,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/FFC-Singular-Crest_Black-e1730992684286.png" alt="Fulham FC logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_372,h_130,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Huel-black.png" alt="Huel logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_346,h_200,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Go1-black.png" alt="Go1 logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_501,h_170,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Education-Perfect-black-1.png" alt="Education Perfect logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_375,h_110,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Rise-UP-black.png" alt="RISE UP logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_550,h_117,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Oktopost-black.png" alt="OKTOPOST logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_550,h_112,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/UnifiedPost-Group-black.png" alt="UnifiedPost Group logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_550,h_69,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Danish-Industry-black.png" alt="Danish Industry logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_397,h_120,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Taxfix-black.png" alt="TaxFix logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_380,h_140,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Jimdo-black-1.png" alt="Jimdo logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_352,h_174,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/Levi9-Technology-black.png" alt="Levi9 Technology logo" style={styles.carouselItemImage} /></div>
          <div className="carousel-item" style={styles.carouselItem}><img src="https://res.cloudinary.com/www-hibob-com/w_462,h_180,c_fit/fl_lossy,f_auto,q_auto/wp-website/uploads/ZeroNorth-black.png" alt="ZeroNorth logo" style={styles.carouselItemImage} /></div>
        </div>
      </section>

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
        {filteredStaff.map(s => (
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
  searchInput: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginRight: '10px',
    width: '250px',
  },
  introSection: {
    backgroundColor: '#e3e3e3',
    padding: '20px',
    marginBottom: '20px',
    textAlign: 'center',
    borderRadius: '8px',
  },
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f8f8f8',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    height: '100px',
    marginBottom: '20px',
  },
  carouselWrapper: {
    display: 'flex',
    animation: 'scrollRightToLeft 70s linear infinite',
  },
  carouselItem: {
    marginRight: '70px',
    borderRadius: '1px',
    padding: '19px',
  },
  carouselItemImage: {
    height: '50px',
    width: 'auto',
  },
  sectionHeader: {
    color: '#333',
    marginTop: '-20px',
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
    marginBottom: '10px',
  },
  listItem: {
    margin: '8px 0',
    marginRight: '40px',
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

// Keyframes for continuous seamless scrolling
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes scrollRightToLeft {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }`, styleSheet.cssRules.length);

export default Home;
