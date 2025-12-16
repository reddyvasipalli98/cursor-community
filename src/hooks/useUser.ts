import { useAuth } from '../context/AuthContext';

// Helper hook with commonly used user properties
export const useUser = () => {
  const { user, isAuthenticated } = useAuth();
  
  return {
    user,
    isAuthenticated,
    // Convenient getters
    userName: user?.name || 'Guest',
    userEmail: user?.email || '',
    userPicture: user?.picture || '',
    firstName: user?.given_name || user?.name?.split(' ')[0] || 'User',
    lastName: user?.family_name || user?.name?.split(' ').slice(1).join(' ') || '',
    userId: user?.sub || '',
  };
};

// Helper to check if user has specific permissions (can be extended)
export const usePermissions = () => {
  const { isAuthenticated, user } = useAuth();
  
  return {
    canUploadFiles: isAuthenticated,
    canComment: isAuthenticated,
    canCreatePosts: isAuthenticated,
    isAdmin: user?.email?.endsWith('@yourcompany.com') || false, // Example admin check
    canModerate: user?.email?.endsWith('@yourcompany.com') || false,
  };
};

export default useUser;