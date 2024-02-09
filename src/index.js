import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="700535868110-vmptg7hjd8uh6t7onp693nt442npqm4f.apps.googleusercontent.com" >
  <React.StrictMode>
   
    <App />
   
  </React.StrictMode>
  </GoogleOAuthProvider>
);


