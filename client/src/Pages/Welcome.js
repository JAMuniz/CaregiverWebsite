import React, { useState } from 'react';
import '../css/welcome.css';
import Navbar from '../Components/Navbar';

function Welcome() {

  const [route, setRoute] = useState('');
  //const [message, setMessage] = useState('');
  
  
  return (
    <div>
        < Navbar />
        <div className="Welcome">
        <aside className="Sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="#search" onClick = {() => setRoute("search")}>Search Service</a></li>
                <li><a href="#account" onClick = {() => setRoute("account")}>Account</a></li>
            </ul>
        </aside>

        <main className="Main-content">
            {
              (() => {
                if (route === "search") {
                  return(
                    <>
                    <p>search</p>
                    </>
                  );
                } else if (route === "account") {
                  return(
                    <>
                    <p>account</p>
                    </>
                  );
                } else {
                  return(
                    <>
                    <p>This is your personalized dashboard. Use the menu on the left to navigate.</p>
                    </>
                  );
                };
              })()
            }
        </main>
        </div>
    </div>
  );
}

export default Welcome;
