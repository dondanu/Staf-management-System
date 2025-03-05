import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validate input fields
  const validate = () => {
    let formErrors = {};
    if (!email) formErrors.email = "Email is required!";
    if (!password) formErrors.password = "Password is required!";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    // If there are no validation errors, send data to the backend
    if (Object.keys(formErrors).length === 0) {
      const loginData = { email, password };

      axios.post('http://localhost:5000/api/login', loginData)
        .then((response) => {
          console.log(response.data.message);
          window.location.href = "/home";  // Redirect to home page
        })
        .catch((error) => {
          console.error('Error logging in:', error.response.data);
          alert('Username | Password Incorrect');
        });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Staff Management System</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subHeading}>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
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

          <button type="submit" style={styles.button}>Login</button>
        </form>

        {/* Register and Admin Buttons */}
        <div style={styles.navigation}>
          <button style={styles.navButton} onClick={() => window.location.href = "/register"}>Register</button>
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
    transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s', // Add animation transitions
  },
  buttonHover: {
    backgroundColor: '#2980b9',
    transform: 'scale(1.1)',  // Scale effect on hover
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',  // Shadow effect
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
    transition: 'transform 0.3s, background-color 0.3s',
  },
  navButtonHover: {
    transform: 'scale(1.05)',
    backgroundColor: '#1abc9c',
  },
};

// Adding hover effect using CSS pseudo-classes
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = 'none';
  });
});

export default Login;
