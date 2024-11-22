import { useParams } from "react-router-dom";
import { useUserById } from "../../lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import NotFound from "./NotFound";

const Profile = () => {
  const { isAuthenticated, user: currentUser, isLoading: authLoading } = useAuth();
  const { userId } = useParams();
  console.log(userId);

  const { data: user, isLoading: userLoading, isError } = useUserById(userId || "");

  // Handle loading and error states
  if (authLoading || userLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !user) {
    return <NotFound />;
  }

  // Ensure social media links and other properties are safe to access
  const { imageUrl, name, city, Linkedin, instagram, $id: userIdFromData } = user;

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center bg-gray-700 py-10 gap-2 rounded-lg relative">
      {imageUrl && (
        <img
          width={80}
          height={80}
          className="rounded-full"
          src={imageUrl}
          alt={`${name}'s profile`}
        />
      )}
      {name && <h2 className="font-bold text-2xl">{name}</h2>}
      {city && <p className="font-normal text-xl">{city}</p>}

      <div className="w-fit h-fit flex gap-2 mt-5">
        {Linkedin && (
          <a
            href={Linkedin}
            className="cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-10 h-10"
              src="https://img.icons8.com/color/48/000000/linkedin.png"
              alt="LinkedIn"
            />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            className="cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-10 h-10"
              src="https://img.icons8.com/color/48/000000/instagram-new--v2.png"
              alt="Instagram"
            />
          </a>
        )}
      </div>

      {isAuthenticated && currentUser?.$id === userIdFromData && (
        <button className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Edit
        </button>
      )}
    </div>
  );
};

export default Profile;
