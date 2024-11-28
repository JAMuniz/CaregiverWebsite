import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './Components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
