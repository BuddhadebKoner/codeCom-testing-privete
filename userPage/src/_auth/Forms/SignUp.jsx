import { useState } from "react";
import { createUserAccount } from "../../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = { name, email, password };
      const createUser = await createUserAccount(user);

      if (!createUser) {
        console.error("Error creating user account");
        setLoading(false);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`sign-up-container p-6 rounded shadow-md w-80 ${loading ? "pointer-events-none opacity-50" : ""
        }`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="spinner border-4 border-t-green-500 rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded mb-4"
          required
          disabled={loading}
        />
        <label className="mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded mb-4"
          required
          disabled={loading}
        />
        <label className="mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-4"
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
