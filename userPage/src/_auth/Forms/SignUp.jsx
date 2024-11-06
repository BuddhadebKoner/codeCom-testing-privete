import { useState } from "react";
import { createUserAccount } from "../../lib/appwrite/api";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-up API call here
    const user = { name, email, password };
    const createUser = await createUserAccount(user);
    if (!createUser) {
      console.error("Error creating user account");
      return;
    }
    navigate("/");
    console.log("Sign up with:", { name, email, password });
  };

  return (
    <div className="sign-up-container bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded mb-4"
          required
        />
        <label className="mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded mb-4"
          required
        />
        <label className="mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
