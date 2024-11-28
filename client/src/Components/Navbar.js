import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('mem_id');
    navigate('/');
  };

  return (
    <nav className="Navbar">
      <Link to="/" className="Navbar-brand">Caregiver Website</Link>
      {userName && (
        <div className="Navbar-welcome">
          Welcome, {userName}!
        </div>
      )}
      <div className="Navbar-links">
        {userName ? (
          <button className="Navbar-button" onClick={handleLogout}>Log Out</button>
        ) : (
          <>
            <Link to="/signin" className="Navbar-button">Sign Up</Link>
            <Link to="/login" className="Navbar-button">Log In</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
