import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BigLoader from "../components/shared/BigLoader";
import { Helmet } from "react-helmet";

const AuthLayout = () => {

   return (
      <div className="w-[100vw] h-screen lg:px-0 md:px-0 px-0 bg-primary-100 flex justify-center items-center">
         <Helmet>
            <meta charSet="utf-8" />
            <title>User Authentication</title>
         </Helmet>
         <section className="flex flex-1 flex-col justify-center items-center bg-primary-100 py-10 px-5 lg:px-20 md:px-10 rounded-md">
            <Outlet />
         </section>
      </div>
   );
};

export default AuthLayout;