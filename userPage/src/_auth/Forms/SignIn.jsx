import { useState } from "react";
import { useSignInUser } from "../../lib/react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Use the custom mutation hook for signing in
  const { mutate: signInUser, isPending: isSignInLoading, isError } = useSignInUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return; // Validate required fields

    // Trigger the mutation with user data
    signInUser(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error signing in:", error);
        },
      }
    );
  };

  return (
    <div className="relative">

      {/* Loading Overlay */}
      {isSignInLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <img
            className="animate-spin"
            width={50}
            height={50}
            src="/loader.svg"
            alt="Loading..."
          />
        </div>
      )}

      {/* Sign In Form */}
      <div
        className={`bg-black p-6 rounded shadow-md w-80 relative ${isSignInLoading ? "pointer-events-none opacity-50" : ""
          }`}
      >
        <h2 className="text-2xl font-bold">Sign in</h2>
        <h3 className="font-bold py-3">Login to your account</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-white">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded mb-4 text-black"
            required
            disabled={isSignInLoading}
          />
          <label className="mb-2 text-white">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded mb-4 text-black"
            required
            disabled={isSignInLoading}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 rounded ${isSignInLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            disabled={isSignInLoading}
          >
            {isSignInLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {isError && (
          <p className="text-red-500 mt-4">
            Failed to sign in. Please check your credentials and try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
