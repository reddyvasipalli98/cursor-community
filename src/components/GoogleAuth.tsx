import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}

const GoogleAuth: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const onSuccess = (credentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<DecodedToken>(credentialResponse.credential);
        
        const userData = {
          sub: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          given_name: decoded.given_name,
          family_name: decoded.family_name,
        };
        
        login(userData);
        // console.log('Login Success - User stored in global context:', userData);
      }
    } catch (error) {
      console.error('Failed to decode Google credential:', error);
    }
  };

  const onError = () => {
    console.log('Google Login Failed');
  };

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated && user) {
    return (
      <div className="user-profile">
        <div className="user-info">
          <img 
            src={user.picture} 
            alt={user.name}
            className="user-avatar"
          />
          <div className="user-details">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <GoogleLogin 
      onSuccess={onSuccess} 
      onError={onError}
      theme="filled_blue"
      size="medium"
      text="signin_with"
      shape="rectangular"
    />
  );
};

export default GoogleAuth;