import { useState } from "react";
import { signInUser } from "../../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSignInLoading(true);
    const user = { email, password };
    const signIn = await signInUser(user);
    if (!signIn) {
      console.error("Error signing in");
      setIsSignInLoading(false);
      return;
    }
    setIsSignInLoading(false);
    // console.log("Sign in with:", signIn);
    // refresh the window
    navigate("/");
    window.location.reload();
  };


  return (
    <div className="sign-in-container bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
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
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
