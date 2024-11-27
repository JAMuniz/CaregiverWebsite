import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/" className="Navbar-brand">
        Caregiver Website
      </Link>
      <div className="Navbar-links">
        <Link to="/signin" className="Navbar-button">Sign Up</Link>
        <Link to="/login" className="Navbar-button">Log In</Link>
      </div>
    </nav>
  );
}

export default Navbar;
