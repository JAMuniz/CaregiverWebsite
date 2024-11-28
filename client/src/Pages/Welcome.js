import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/welcome.css';
import Navbar from '../Components/Navbar';

function Welcome() {

  const [route, setRoute] = useState('');

  const [balance, setBalance] = useState('');
  const [rating, setRating] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone] = useState('');
  const [maxHours, setmaxHours] = useState('');
  const [parentInfo, setPinfo] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const userName = localStorage.getItem('name');
  const memberID = localStorage.getItem('mem_id');

  const formatPhoneNumber = (value) => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 3) {
        return numericValue;
    } else if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
        return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    }
  };

  const fetchAccount = async () => {
    const formData = {
      member_id: memberID        
    };
    try {
      const response = await fetch("http://localhost:5000/API/account.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
          setBalance(result.balance);
          setRating(result.review_score);
          setAddress(result.address);
          setPhone(result.phone_number);
          setmaxHours(result.max_service_hours_per_week);
          setPinfo(result.parent_info);
          setEmail(result.email);
      } else {
          alert(`Error: ${result.message}`);
      };
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
  }
  
  
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
                  return(
                    <>
                    <p>search</p>
                    </>
                  );
                } else if (route === "account") {  //account route
                  fetchAccount();
                  return(
                    <>
                    <h1>Account Info</h1>
                    <br></br>
                    <p><strong>Balance: </strong>C${balance}</p>
                    <p><strong>Review Score: </strong>{rating}</p>
                    <p><strong>Maxium Hours Per Week: </strong>{maxHours}</p>
                    <p><strong>Parent Info: </strong>{parentInfo}</p>
                    <br></br>
                    <h1>Profile Info</h1>
                    <p><strong>Name: </strong>{userName}</p>
                    <p><strong>Email: </strong>{email}</p>
                    <p><strong>Address: </strong>{address}</p>
                    <p><strong>Phone Number: </strong>{formatPhoneNumber(phone_number)}</p>
                    <br></br>
                    <button className="Navbar-button" onClick={() => navigate("/updateinfo")}>Update Info</button>
                    </>
                  );
                } if (route === "contracts") {  //contracts route
                  fetchAccount();
                  return(
                    <>
                    <p>contracts</p>
                    </>
                  );
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
