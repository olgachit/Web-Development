// Context/ThemeProvider.jsx
import { useState } from 'react';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Manage theme state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark')); // Switch between themes
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      {children}
    </ThemeContext.Provider>
  );
}