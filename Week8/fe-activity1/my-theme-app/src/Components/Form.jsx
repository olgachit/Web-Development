// Components/Form.jsx
import Panel from './Panel';
import Button from './Button';

export default function Form() {
  return (
    <Panel title="Welcome to the Form"> {/* Title of the form */}
      <Button>Sign up</Button> {/* Button for sign-up */}
      <Button>Log in</Button> {/* Button for log-in */}
    </Panel>
  );
}