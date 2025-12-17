import React from 'react';
import { useUser } from '../hooks/useUser';

interface UserProfileCardProps {
  showEmail?: boolean;
  compact?: boolean;
  className?: string;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  showEmail = true,
  compact = false,
  className = ''
}) => {
  const { user, isAuthenticated, userName, userEmail, userPicture } = useUser();

  if (!isAuthenticated || !user) {
    return (
      <div className={`user-profile-card not-authenticated ${className}`}>
        <p>Please sign in to view profile</p>
      </div>
    );
  }

  return (
    <div className={`user-profile-card ${compact ? 'compact' : ''} ${className}`}>
      <img 
        src={userPicture} 
        alt={userName}
        className="profile-picture"
      />
      <div className="profile-info">
        <h3 className="profile-name">{userName}</h3>
        {showEmail && <p className="profile-email">{userEmail}</p>}
      </div>
    </div>
  );
};

// Welcome message component
export const WelcomeMessage: React.FC = () => {
  const { isAuthenticated, firstName } = useUser();

  if (!isAuthenticated) {
    return <p className="welcome-message">Welcome to Cursor Community!</p>;
  }

  return (
    <p className="welcome-message">
      Welcome back, {firstName}! 👋
    </p>
  );
};

// User status indicator
export const UserStatus: React.FC = () => {
  const { isAuthenticated, userName } = useUser();
  
  return (
    <div className="user-status">
      <span className={`status-indicator ${isAuthenticated ? 'online' : 'offline'}`}></span>
      <span className="status-text">
        {isAuthenticated ? `${userName} (Online)` : 'Not signed in'}
      </span>
    </div>
  );
};

export default UserProfileCard;