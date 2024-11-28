import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import UserContext from './UserContext';

function Navbar() {
  const navigate = useNavigate();
  const { name, updateName } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('mem_id');
    updateName();
    navigate('/');
  };

  return (
    <nav className="Navbar">
      <Link to="/" className="Navbar-brand">Caregiver Website</Link>
      {name && (
        <div className="Navbar-welcome">
          Welcome, {name}!
        </div>
      )}
      <div className="Navbar-links">
        {name ? (
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
