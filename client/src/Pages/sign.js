import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sign.css';
import Navbar from '../Components/Navbar';

function Sign() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pInfo, setPinfo] = useState('');
    const [maxHours, setmaxHours] = useState('');
    const [address, setAdd] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        };
        try {
            const response = await fetch("http://localhost:5000/API/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (result.success) {
                alert("Registration successful!");
                navigate('/login');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

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
            <h1>Sign In</h1>
            <form className="Sign-form" onSubmit={handleSignIn}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your First and Last Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter your phone (only numbers)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="parentText">Parent Information:</label>
                    <input
                        type="text"
                        id="parentText"
                        value={pInfo}
                        onChange={(e) => setPinfo(e.target.value)}
                        placeholder="Enter your Parent Information"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maxHours">Maximum Hour Per Week:</label>
                    <input
                        type="number"
                        id="maxHours"
                        value={maxHours}
                        onChange={(e) => setmaxHours(e.target.value)}
                        placeholder="Enter how many hours per week"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAdd(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="Sign-button">Sign In</button>
            </form>
            </div>
        </div>
    );
}

export default Sign;
