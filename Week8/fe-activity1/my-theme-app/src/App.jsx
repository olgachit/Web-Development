// App.jsx
import ThemeProvider from './Context/ThemeProvider';
import Form from './Components/Form';
import Button from './Components/Button';

export default function App() {
  return (
    <ThemeProvider> {/* Provides theme context to all child components */}
      <Form />
      <Button>Toggle Theme</Button> {/* This button can toggle the theme */}
    </ThemeProvider>
  );
}