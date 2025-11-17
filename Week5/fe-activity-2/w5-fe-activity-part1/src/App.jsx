import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UseEffectTest from './UseEffectTest';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UseEffectTest />
  );
}

export default App
