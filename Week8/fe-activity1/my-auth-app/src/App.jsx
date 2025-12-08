// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/login" element={<Login />} /> {/* Login route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}