import React, { useState } from 'react';
import '../css/sign.css';
import Navbar from '../Components/Navbar';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle the sign-in logic here (e.g., call an API or validate)
    console.log('Sign In with:', { email, password });
  };

  return (
    <div>
        <Navbar />
        <div className="Sign">
        <h1>Sign In</h1>
        <form className="Sign-form" onSubmit={handleSignIn}>
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
                type="password"
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
