import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
   return (
      <div className=" min-h-screen flex flex-col items-center justify-center">
         <h1 className="text-3xl font-bold mb-6">Welcome to CodeCom</h1>
         <div className="auth-links mb-6">
            <Link to="/sign-in" className="text-blue-500 mx-2">Sign In</Link>
            <Link to="/sign-up" className="text-blue-500 mx-2">Sign Up</Link>
         </div>
         {/* Render SignIn or SignUp based on the route */}
         <Outlet />
      </div>
   );
};

export default AuthLayout;
