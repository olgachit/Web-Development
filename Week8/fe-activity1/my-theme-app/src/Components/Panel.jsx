// Components/Panel.jsx
import { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';

export default function Panel({ title, children }) {
  const { theme } = useContext(ThemeContext); // Access the theme
  const className = 'panel-' + theme; // Dynamic class based on theme

  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}