import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string; // Google user ID
  given_name?: string;
  family_name?: string;
}

interface AuthContextType {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  login: (userData: GoogleUser) => void;
  logout: () => void;
  updateUser: (userData: Partial<GoogleUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);

  const login = useCallback((userData: GoogleUser) => {
    setUser(userData);
    // Optionally store in localStorage for persistence
    localStorage.setItem('googleUser', JSON.stringify(userData));
    // console.log('User logged in and stored in context:', userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('googleUser');
    console.log('User logged out and removed from context');
  }, []);

  const updateUser = useCallback((userData: Partial<GoogleUser>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('googleUser', JSON.stringify(updatedUser));
    }
  }, [user]);

  // Load user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('googleUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        console.log('User restored from localStorage:', userData);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('googleUser');
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;