import React, { useState } from 'react';
import '../css/welcome.css';
import Navbar from '../Components/Navbar';
import Account from '../Components/Account';
import Contracts from '../Components/Contracts';
import Search from '../Components/Search';

function Welcome() {
    const [route, setRoute] = useState('');
    const memberID = localStorage.getItem('mem_id');

    return (
        <div>
            < Navbar />
            <div className="Welcome">
            <aside className="Sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><a href="#search" onClick = {() => setRoute("search")}>Search for Service</a></li>
                    <li><a href="#account" onClick = {() => setRoute("account")}>Account</a></li>
                    <li><a href="#account" onClick = {() => setRoute("contracts")}>My Contracts</a></li>
                </ul>
            </aside>

            <main className="Main-content">
                {
                (() => {
                    if (route === "search") {  //search route
                        return <Search />;
                    } else if (route === "account") {  //account route
                        return <Account memberID={memberID} />;
                    } if (route === "contracts") {  //contracts route
                        return <Contracts memberID={memberID} />;
                    } else {  //default route (only appears when you open the dashboard at first)
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
