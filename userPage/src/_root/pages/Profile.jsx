import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useUserById } from "../../lib/react-query/queriesAndMutation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import NotFound from "./NotFound";
import BigLoader from "../../components/shared/BigLoader";
import ProfileModel from "../../components/shared/ProfileModel";

const Profile = () => {
  const { isAuthenticated, user: currentUser, isLoading: authLoading } = useAuth();
  const { userId } = useParams();
  const { data: user, isLoading: userLoading, isError } = useUserById(userId, {
    refetchOnWindowFocus: true,
  });


  const [isModalOpen, setIsModalOpen] = useState(false);

  if (authLoading || userLoading) {
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

  const handleImageClick = () => {
    setIsModalOpen(true);
    // diable scroll and scrollbar
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // enable scroll and scrollbar
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Profile Header */}
      <div className="w-full h-fit flex flex-col justify-center items-center bg-gray-700 py-10 gap-2 rounded-lg relative">
        {imageUrl && (
          <img
            width={80}
            height={80}
            className={`${user.role !== 'user' ? 'admin-profile' : 'rounded-full'}  cursor-pointer`}
            src={imageUrl}
            alt={`${name || "User"}'s profile`}
            onClick={handleImageClick}
          />
        )}

        <h2 className="font-bold h3-bold">
          {name || "User"} &nbsp;
          <span className="small-semibold">
            ({role || null})
          </span>
        </h2>
        <p className="font-normal text-xl">{city || null}</p>

        {/* Social Links */}
        <div className="flex gap-3 mt-4">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <img
                className="w-10 h-10"
                src="/assets/icons/linkedin.png"
                alt="LinkedIn"
              />
            </a>
          )}
          {x && (
            <a href={x} target="_blank" rel="noopener noreferrer">
              <img
                className="w-10 h-10"
                src="/assets/icons/x.png"
                alt="x"
              />
            </a>
          )}
        </div>

        {/* Edit Button for Authenticated User */}
        {isAuthenticated && currentUser?.$id === userIdFromData && (
          <Link
            to={`/profile/${currentUser.$id}/edit`}
            className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Edit
          </Link>
        )}
      </div>

      {/* Modal for Full-Size Image */}
      {isModalOpen && <ProfileModel imageUrl={imageUrl} onClose={closeModal} />}

      {/* Navigation Links */}
      <div className="flex gap-5 justify-start items-center mt-5">
        <NavLink to="">
          <img width={30} height={30} src="/assets/person.svg" alt="person" />
        </NavLink>
        <NavLink
          to={`/profile/${userId}/attended`}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`
          }
        >
          Attended Events
        </NavLink>
        {
          user.events.length !== 0 ? (
            <NavLink
              to={`/profile/${userId}/organized`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`
              }
            >
              Organized Events
            </NavLink>
          ) : (null)
        }
        {
          isAuthenticated && currentUser?.$id === userIdFromData && (
            <NavLink
              to={`/profile/${userId}/active-tickets`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`
              }
            >
              Active Tickets
            </NavLink>
          )
        }
      </div>
      <div className="w-full h-fit py-10">
        {/* Nested Routes */}
        <Outlet context={
          {
            userInfo: user,
            attendedEvents: user?.entryPass,
            organizedEvents: user?.events,
          }} />
      </div>
    </>
  );
};

export default Profile;
