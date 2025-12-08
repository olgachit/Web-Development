// pages/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate
import AuthContext from "../Context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState(""); // Local state for username
  const { login, user } = useContext(AuthContext); // Access the login function from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    login(username); // Call the login function with the username
    return navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        placeholder="Username"
        required // Ensure input is not empty
      />
      <button type="submit">Login</button> {/* Submit button */}
    </form>
  );
}