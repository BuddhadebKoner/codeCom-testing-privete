import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useUserById } from "../../lib/react-query/queriesAndMutation";
import { useAuth } from "../../context/AuthContext";
import NotFound from "./NotFound";
import BigLoader from "../../components/shared/BigLoader";
import { Helmet } from "react-helmet";

const EditProfile = lazy(() => import("../../components/shared/EditProfile"));
const ProfileModel = lazy(() => import("../../components/shared/ProfileModel"));

const SocialLink = ({ url, icon, alt }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <img className="w-10 h-10" src={icon} alt={alt} />
  </a>
);

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isLocked]);
};

const Profile = () => {
  const { isAuthenticated, user: currentUser, isLoading: authLoading } = useAuth();
  const { userId } = useParams();
  const { data: user, isLoading: userLoading, isError } = useUserById(userId, {
    refetchOnWindowFocus: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useBodyScrollLock(isModalOpen || isEditProfileOpen);

  const isLoading = authLoading || userLoading;
  const isOwner = isAuthenticated && currentUser?.$id === user?.$id;

  if (isLoading) {
    return (
      <div className="w-full h-fit flex items-center justify-center">
        <BigLoader />
      </div>
    );
  }

  if (isError || !user) {
    return <NotFound />;
  }

  const { imageUrl, name, city, linkedin, x, $id: userIdFromData, role } = user;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{name || "User"}</title>
      </Helmet>

      {/* Profile Header */}
      <div className="w-full h-fit flex flex-col justify-center items-center bg-gray-700 py-10 gap-2 rounded-lg relative">
        {imageUrl && (
          <img
            width={80}
            height={80}
            className={`${role !== "user" ? "admin-profile" : "rounded-full"} cursor-pointer`}
            src={imageUrl}
            alt={`${name || "User"}'s profile`}
            onClick={() => setIsModalOpen(true)}
          />
        )}
        <h2 className="font-bold h3-bold">
          {name || "User"} &nbsp;
          <span className="small-semibold">({role || null})</span>
        </h2>
        <p className="font-normal text-xl">{city || null}</p>

        {/* Social Links */}
        <div className="flex gap-3 mt-4">
          {linkedin && <SocialLink url={linkedin} icon="/assets/icons/linkedin.png" alt="LinkedIn" />}
          {x && <SocialLink url={x} icon="/assets/icons/x.png" alt="X" />}
        </div>

        {/* Edit Button for Authenticated User */}
        {isOwner && (
          <button
            className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsEditProfileOpen(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* Modal for Full-Size Image */}
      <Suspense fallback={<BigLoader />}>
        {isModalOpen && <ProfileModel imageUrl={imageUrl} onClose={() => setIsModalOpen(false)} />}

        {/* Overlay Modal for Edit Profile */}
        {isEditProfileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <EditProfile closeEditProfile={() => setIsEditProfileOpen(false)} />
          </div>
        )}
      </Suspense>

      {/* Navigation Links */}
      <div className="flex gap-5 justify-start items-center mt-5">
        <NavLink to="">
          <img width={30} height={30} src="/assets/person.svg" alt="person" />
        </NavLink>
        <NavLink
          to={`/profile/${userId}/attended`}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`
          }
        >
          Attended Events
        </NavLink>
        {isOwner && (
          <NavLink
            to={`/profile/${userId}/active-tickets`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`
            }
          >
            Active Tickets
          </NavLink>
        )}
      </div>
      <div className="w-full h-fit py-10">
        {/* Nested Routes */}
        <Outlet
          context={{
            userInfo: user,
            attendedEvents: user?.entryPass,
            organizedEvents: user?.events,
          }}
        />
      </div>
    </>
  );
};

export default Profile;
