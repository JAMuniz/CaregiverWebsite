import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sign.css';
import Navbar from '../Components/Navbar';

let debounce = false;

function UpdateInfo() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pInfo, setPinfo] = useState('');
    const [maxHours, setmaxHours] = useState('');
    const [address, setAdd] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [Oname, setOName] = useState('');
    const [Ophone, setOPhone] = useState('');
    const [OpInfo, setOPinfo] = useState('');
    const [OmaxHours, setOmaxHours] = useState('');
    const [Oaddress, setOAdd] = useState('');
    const [Oemail, setOEmail] = useState('');

    //const userName = localStorage.getItem('name');
    const memberID = localStorage.getItem('mem_id');

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            password: password,
            address: address,
            phone_number: phone,
            parent_info: pInfo,
            email: email,
            max_service_hours_per_week: maxHours,

            orig_name: Oname,
            orig_address: Oaddress,
            orig_phone_number: Ophone,
            orig_parent_info: OpInfo,
            orig_email: Oemail,
            orig_max_service_hours_per_week: OmaxHours,

            member_id: memberID
        };
        try {
            const response = await fetch("http://localhost:5000/API/updateInfo.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (result.success) {
                localStorage.setItem('name', result.name);
                alert("Update successful!");
                navigate('/welcome#account');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
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
              setName(result.username);
              setAdd(result.address);
              setPhone(result.phone_number);
              setmaxHours(result.max_service_hours_per_week);
              setPinfo(result.parent_info);
              setEmail(result.email);
              setOName(result.username);
              setOAdd(result.address);
              setOPhone(result.phone_number);
              setOmaxHours(result.max_service_hours_per_week);
              setOPinfo(result.parent_info);
              setOEmail(result.email);
              
          } else {
              alert(`Error: ${result.message}`);
          };
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }
    if (!debounce) {
        debounce = true;
        fetchAccount();
    }

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

    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
    };

    return (
        <div>
            <Navbar />
            <div className="Sign">
            <h1>Update Account Information</h1>
            <p><i>Leave a field blank if you don't want to change it.</i></p>
            <form className="Sign-form" onSubmit={handleSignIn}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Change First and Last Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Change phone (only numbers)"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="parentText">Parent Information:</label>
                    <input
                        type="text"
                        id="parentText"
                        value={pInfo}
                        onChange={(e) => setPinfo(e.target.value)}
                        placeholder="Change Parent Information"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maxHours">Maximum Hour Per Week:</label>
                    <input
                        type="number"
                        id="maxHours"
                        value={maxHours}
                        onChange={(e) => setmaxHours(e.target.value)}
                        placeholder="Change max hours per week"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAdd(e.target.value)}
                        placeholder="Change email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Change email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Change password"
                    />
                </div>
                <br></br>
                <p><strong><i>Check to make sure you didn't change something important before pressing this.</i></strong></p>
                <button type="submit" className="Sign-button">Update</button>
            </form>
            </div>
        </div>
    );
}

export default UpdateInfo;