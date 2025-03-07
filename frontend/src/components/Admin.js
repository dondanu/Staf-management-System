import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for redirection

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Validate input fields
  const validate = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Username is required!";
    if (!password) formErrors.password = "Password is required!";
    return formErrors;
  };

  // Handle login attempt
  const handleLogin = () => {
    const formErrors = validate();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      if (username === adminCredentials.username && password === adminCredentials.password) {
        // If username and password match, navigate to Home page
        navigate('/home');
      } else {
        alert('Password Is Incorrect');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Staff Management System</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subHeading}>Admin</h2>

        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <button type="button" onClick={handleLogin} style={styles.button}>Login</button>
        </form>

        {/* Register and Login Buttons */}
        <div style={styles.navigation}>
          <button style={styles.navButton} onClick={() => window.location.href = "/register"}>Register</button>
          <button style={styles.navButton} onClick={() => window.location.href = "/"}>Login</button>
        </div>
      </div>
    </div>
  );
};

// Inline styles for a colorful layout (same as Login.js)
const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #8e44ad, #3498db)', // Gradient background
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px', // Space between heading and form
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '350px',
    padding: '20px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  subHeading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '0px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    color:'black',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '12px 25px',
    fontSize: '16px',  // Only this one
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  navigation: {
    marginTop: '20px',
    textAlign: 'center',
  },
  navButton: {
    backgroundColor: '#16a085',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
    fontSize: '14px',
  },
};

export default Admin;
