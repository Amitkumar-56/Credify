import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PanVerificationCase } from './types';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

interface CaseState {
  cases: PanVerificationCase[];
  addCase: (newCase: PanVerificationCase) => void;
}

interface StoreContextType extends AuthState, CaseState {}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  
  // Dummy initial cases
  const [cases, setCases] = useState<PanVerificationCase[]>([
    {
      id: 'CRD-102934',
      applicantName: 'Amit Kumar',
      mobileNumber: '9876543210',
      panNumber: 'ABCDE1234F',
      purpose: 'Loan Verification',
      consentGiven: true,
      verificationDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'Verified',
      panStatus: 'Active',
      nameMatchStatus: 'Matched'
    },
    {
      id: 'CRD-509212',
      applicantName: 'Priya Sharma',
      mobileNumber: '9123456780',
      panNumber: 'XYZZY9876Q',
      purpose: 'Credit Card',
      consentGiven: true,
      verificationDate: new Date(Date.now() - 86400000).toISOString(),
      status: 'Failed',
      panStatus: 'Invalid',
      nameMatchStatus: 'N/A'
    }
  ]);

  const login = (name: string) => {
    setIsAuthenticated(true);
    setUser({ name });
    // In a real app we'd save the token to localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addCase = (newCase: PanVerificationCase) => {
    setCases(prev => [newCase, ...prev]);
  };

  return (
    <StoreContext.Provider value={{ isAuthenticated, user, login, logout, cases, addCase }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
