// pages/Home.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import AuthContext from '../Context/AuthContext';

export default function Home() {
  const { user, logout } = useContext(AuthContext); // Access the auth context

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />; // Redirect to the login route
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
}