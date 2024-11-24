import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import Navbar from '../Components/Navbar';

function Home() {
  return (
    <div>
        < Navbar />
        <div className="Home">
            <header className="Home-header">
                <h1>Welcome to the Caregiver Website</h1>
                <p>
                    Connecting families with trusted caregivers for their loved ones.
                </p>
                <p>
                    <Link to="/signin" className="Home-link">Sign up</Link>
                    {' '}or {' '}
                    <Link to="/login" className="Home-link">Log In</Link> 
                    {' '} to find a caregiver, manage your profile, or track your service contracts.
                </p>
            </header>
        </div>
    </div>
    
  );
}

export default Home;
