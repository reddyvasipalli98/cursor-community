// src/components/GoogleAuth.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // You may need to install this package

const GoogleAuth = () => {
  const onSuccess = (credentialResponse) => {
    // The credential is a JWT (JSON Web Token)
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    
    console.log('Login Success:', decoded);
    
    // **Important Security Step (Backend Integration)**:
    // Send the JWT (credentialResponse.credential) to your backend server.
    // Your backend must verify the token's signature with Google's public key
    // and extract the user's data (email, name, etc.). The backend then creates
    // and manages your application's internal session for the user (e.g., by issuing 
    // your own JWT or a session cookie).
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin 
      onSuccess={onSuccess} 
      onError={onError} 
    />
  );
};

export default GoogleAuth;