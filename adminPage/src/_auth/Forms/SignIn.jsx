import { useState } from "react";
import { signInUser } from "../../lib/appwrite/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";  // Import the auth context

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const navigate = useNavigate();
  const { checkAuthUser,user } = useAuth();

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
    console.log("Sign-in successful:", signIn);

    await checkAuthUser(); 
    navigate("/");
  };

  return (
    <div className="sign-in-container bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Hello {
          user?.name || "Bro"
        } </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="form-group">
          <label htmlFor="email" className="text-sm">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-sm">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSignInLoading}
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSignInLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
