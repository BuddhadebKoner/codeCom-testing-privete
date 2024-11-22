import { useState } from "react";
import { useSignInUser } from "../../lib/react-query/queriesAndMutation"; // Ensure correct path to your mutation hook
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Use the custom mutation hook for signing in
  const { mutate: signInUser, isLoading: isSignInLoading, isError } = useSignInUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger the mutation with user data
    signInUser(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
          window.location.reload();
        },
        onError: () => {
          console.error("Error signing in");
        },
      }
    );
  };

  return (
    <div className="bg-black p-6 rounded shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded mb-4 text-black"
          required
        />
        <label className="mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-4  text-black"
          required
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${isSignInLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSignInLoading}
        >
          {isSignInLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {isError && <p className="text-red-500 mt-4">Failed to sign in. Please try again.</p>}
    </div>
  );
};

export default SignIn;
