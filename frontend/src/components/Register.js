import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  // Validate input fields
  const validate = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Username is required!";
    if (!email) formErrors.email = "Email is required!";
    if (!password) formErrors.password = "Password is required!";
    if (!role) formErrors.role = "Role is required!";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    // If there are no validation errors, proceed with registration
    if (Object.keys(formErrors).length === 0) {
      const registerData = { username, email, password, role };

      axios.post('http://localhost:5000/api/register', registerData)
        .then((response) => {
          console.log('Registration successful');
          window.location.href = "/";  // Redirect to login page after successful registration
        })
        .catch((error) => {
          console.error('Error registering:', error.response.data);
          alert('Error registering. Please try again.');
        });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Staff Management System</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subHeading}>Register</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
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
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
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

          <div style={styles.formGroup}>
            <label style={styles.label}>Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input}
              required
            />
            {errors.role && <span style={styles.error}>{errors.role}</span>}
          </div>

          <button type="submit" style={styles.button}>Register</button>
        </form>

        {/* Register and Admin Buttons */}
        <div style={styles.navigation}>
          <button style={styles.navButton} onClick={() => window.location.href = "/"}>Login</button>
          <button style={styles.navButton} onClick={() => window.location.href = "/admin"}>Admin</button>
        </div>
      </div>
    </div>
  );
};

// Inline styles for a colorful layout
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
    marginBottom: '20px',
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

export default Register;
