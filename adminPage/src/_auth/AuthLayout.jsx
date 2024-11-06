import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout-container bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-500 mb-8">CodeCom Admin Panel</h1>
      <div className="auth-links mb-8 text-center">
        <Link to="/sign-in" className="text-blue-500 mx-4 text-lg hover:text-blue-400">Sign In</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
