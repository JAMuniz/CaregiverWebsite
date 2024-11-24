import React from 'react';
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
                    Sign up or log in to find a caregiver, manage your profile, or track your service contracts.
                </p>
            </header>
        </div>
    </div>
    
  );
}

export default Home;
