import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Staff Management System</h1>
      
      <nav style={styles.nav}>
        {/* Buttons for navigating to Login, Register, Admin pages */}
        <Link to="/login">
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/register">
          <button style={styles.button}>Register</button>
        </Link>
        <Link to="/admin">
          <button style={styles.button}>Admin</button>
        </Link>
      </nav>
    </div>
  );
};

// Inline styles for a colorful layout with hover effects
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
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '40px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: '30px',
  },
  button: {
    backgroundColor: '#f39c12',  // Button color
    color: '#fff',
    padding: '12px 25px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease', // Smooth transition for all properties
    margin: '0 15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow to the button
  },
  buttonHover: {
    backgroundColor: '#e67e22', // Hover background color
    transform: 'scale(1.1)', // Scale up the button slightly
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Increased shadow effect
  },
};

export default Welcome;
