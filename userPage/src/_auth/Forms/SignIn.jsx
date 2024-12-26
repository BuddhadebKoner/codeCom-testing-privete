import { useEffect, useState } from "react";
import { useSignInUser } from "../../lib/react-query/queriesAndMutation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate: signInUser, isPending: isSignInLoading } = useSignInUser();
  const { checkAuthUser } = useAuth();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    signInUser(
      { email, password },
      {
        onSuccess: () => {
          checkAuthUser();
          navigate("/");
        },
        onError: (error) => {
          const errorMessage = error?.response?.data?.message || error?.message || "An unknown error occurred. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };



  return (
    <div className="relative w-full max-w-sm mx-auto mt-10">
      {/* Loading Overlay */}
      {isSignInLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center z-10">
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
        className={`p-6 bg-gray-800 text-white relative ${isSignInLoading ? "pointer-events-none opacity-50" : ""}`}
      >
        <h2 className="h1-bold mb-4 text-center">Sign In</h2>
        <h3 className="base-semibold text-center mb-6">Login to your account</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="small-semibold block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none"
              placeholder="Enter your email"
              required
              disabled={isSignInLoading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="small-semibold block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none"
                placeholder="Enter your password"
                required
                disabled={isSignInLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-4"
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {
                  showPassword ? (
                    <img
                      width={20}
                      height={20}
                      src="/assets/icons/show_pass.svg"
                      alt="show_password" />
                  ) : (
                    <img
                      width={20}
                      height={20}
                      src="/assets/icons/hide_pass.svg"
                      alt="hide_password" />
                  )
                }
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg bg-blue-500 text-white base-semibold ${isSignInLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
            disabled={isSignInLoading}
          >
            {isSignInLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="small-regular text-center mt-2">
          Don’t have an account?
          <Link to="/sign-up" className="text-primary-500 ml-2">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
