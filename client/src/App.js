import './css/App.css';

function App() {
  return (
    <div className="App">
      <nav className="App-navbar">
        <h2>Caregiver Website</h2>
        <div className="App-nav-links">
          <a className="App-link" href="/signin">
            Sign In
          </a>
          <a className="App-link" href="/login">
            Log In
          </a>
        </div>
      </nav>

      <header className="App-header">
        <h1>Welcome to the<br></br>Caregiver Website</h1>
        <p>Connecting families with trusted caregivers for their loved ones.</p>
        <p>
          Sign up or log in to find a caregiver, manage your profile, or track your service contracts.
        </p>
        <a className="App-link" href="/signup">
          Get Started
        </a>
      </header>
    </div>
  );
}

export default App;
