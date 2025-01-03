import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import Navbar from '../Components/Navbar';
import UserContext from '../Components/UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { updateName } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password,            
        };
        try {
            const response = await fetch("http://localhost:5000/API/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (result.success) {
                updateName(result.name);

                localStorage.setItem('mem_id', result.mem_id);
                navigate('/welcome');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <div>
            <Navbar />
            <div className="Login">
            <h1>Log In</h1>
            <form className="Login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                </div>
                <button type="submit" className="Sign-button">Login</button>
            </form>
            </div>
        </div>
    );
}

export default Login;