import React from 'react';
import '../css/welcome.css';
import Navbar from '../Components/Navbar';

function Welcome() {

  return (
    <div>
        < Navbar />
        <div className="Welcome">
        <aside className="Sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="#search">Search Service</a></li>
                <li><a href="#account">Account</a></li>
            </ul>
        </aside>

        <main className="Main-content">
            <p>This is your personalized dashboard. Use the menu on the left to navigate.</p>
        </main>
        </div>
    </div>
  );
}

export default Welcome;
