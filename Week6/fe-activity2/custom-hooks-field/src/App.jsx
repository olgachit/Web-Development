// AppWithCustomHook.jsx
import useField from './useField';
import './App.css';  // Add CSS if needed
import useLocalStorage from './useLocalStorage';

const AppWithCustomHook = () => {
  const nameInput = useField('text');
  const bornInput = useField('date');
  const heightInput = useField('number');

  const [name, setName] = useLocalStorage('name', '');
  const [born, setBorn] = useLocalStorage('born', '');
  const [height, setHeight] = useLocalStorage('height', '');

  const handleSubmit = (event) => {
   

 event.preventDefault();
    setName(nameInput.value);
    setBorn(bornInput.value);
    setHeight(heightInput.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input {...nameInput} />
        </div>
        <br/>
        <div>
          Birthdate: <input {...bornInput} />
        </div>
        <br/>
        <div>
          Height: <input {...heightInput} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {nameInput.value} {bornInput.value} {heightInput.value}
      </div>
    </div>
  );
};

export default AppWithCustomHook;