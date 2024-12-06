import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount } from "../../lib/react-query/queriesAndMutation";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate: signUpUser, isPending: isSignInLoading } = useCreateUserAccount();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true); 

    signUpUser(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Successfully signed up!");
          setLoading(false);
          navigate("/sign-in");
        },
        onError: (error) => {
          setLoading(false);  
          const errorMessage = error?.response?.data?.message || error?.message || "An unknown error occurred. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="relative w-full max-w-sm mx-auto mt-10">
      {/* Loading Overlay */}
      {loading && (
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

      {/* Sign Up Form */}
      <div
        className={`p-6 bg-gray-800 text-white relative ${loading ? "pointer-events-none opacity-50" : ""}`}
      >
        <h2 className="h1-bold mb-4 text-center">Sign Up</h2>
        <h3 className="base-semibold text-center mb-6">Create your account</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="small-semibold block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none"
              placeholder="Enter your name"
              required
              disabled={loading}
              autoComplete="off"
            />
          </div>

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
              disabled={loading}
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
            className={`w-full p-3 rounded-lg bg-blue-500 text-white base-semibold ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="small-regular text-center mt-2">
          Already have an account?
          <Link to="/sign-in" className="text-primary-500 ml-2">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
