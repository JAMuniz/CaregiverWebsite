import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import Navbar from '../Components/Navbar';

function Home() {
  const userName = localStorage.getItem('name');

  return (
    <div>
        < Navbar />
        <div className="Home">
            <header className="Home-header">
                {userName ? (
                    <>
                    <h1>Welcome back!</h1>
                    <p>
                        <Link to="/welcome" className="Home-link">Click here</Link>
                        {' '} to enter your dashboard.
                    </p>
                    </>
                ) : (
                    <>
                    <h1>Welcome to the Caregiver Website</h1>
                    <p>
                        Connecting families with trusted caregivers for their loved ones.
                    </p>
                    <p>
                        <Link to="/signin" className="Home-link">Sign Up</Link>
                        {' '}or {' '}
                        <Link to="/login" className="Home-link">Log In</Link> 
                        {' '} to find a caregiver, manage your profile, or track your service contracts.
                    </p>
                    </>
                )}
            </header>
        </div>
    </div>
    
  );
}

export default Home;
