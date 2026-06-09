import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUserState] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentUserState(user);
    }
  }, []);

  const login = (username: string) => {
    setCurrentUser(username);
    setCurrentUserState(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearCurrentUser();
    setCurrentUserState(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
