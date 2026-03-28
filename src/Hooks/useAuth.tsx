// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { api } from '../api/axiosInstances';
import type { User } from '../types';

export const useAuth = () => {
  // 1. The State (The Bouncer's Notepad)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Check for a returning user when the app first loads
  useEffect(() => {
    const savedUser = localStorage.getItem('hr_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 3. The Login Action
  const login = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // We ask json-server to find a user with this exact email
      const response = await api.get<User[]>(`/users?email=${email}`);
      const users = response.data;

      if (users.length > 0) {
        // Success! We found them.
        const foundUser = users[0];
        setCurrentUser(foundUser);
        localStorage.setItem('hr_user', JSON.stringify(foundUser)); // Save their ID card
        return foundUser; // Hand the user data back to the UI
      } else {
        // Stranger danger!
        setError('No account found with that email.');
        return null;
      }
    } catch (err) {
      setError('Server error during login.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 4. The Logout Action
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hr_user'); // Shred their ID card
  };

  // 5. The Return (What the UI gets to use)
  return { 
    currentUser, 
    isAuthenticated: currentUser !== null, 
    loading, 
    error, 
    login, 
    logout 
  };
};