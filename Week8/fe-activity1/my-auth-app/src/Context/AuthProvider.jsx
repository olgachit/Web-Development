// Context/AuthProvider.jsx
import { useState } from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Initial state is null (no user logged in)

  const login = (username) => {
    setUser({ username }); // Set the user state when logging in
  };

  const logout = () => {
    setUser(null); // Reset the user state when logging out
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Provide the auth context value to children */}
    </AuthContext.Provider>
  );
}