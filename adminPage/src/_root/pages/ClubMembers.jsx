import { useEffect, useState } from "react";
import { getClubMembers } from "../../lib/appwrite/api";

const ClubMembers = () => {
  const [members, setMembers] = useState([]);

  const handelClubMembers = async () => {
    const allMembers = await getClubMembers();
    setMembers(allMembers);
    console.log("clubMembers", allMembers);
  };

  useEffect(() => {
    handelClubMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Club Members</h1>

      {members && members.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {members.map((member) => (
            <div
              key={member.$id}
              className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-lg shadow-lg"
            >
              <img
                width={40}
                src={member.imageUrl} alt="profile-image" />
              {/* remove - from member role */}
              <h2 className="text-xl font-semibold">
                {member.role
                  .replace(/-/g, ' ') // Replace hyphens with spaces
                  .replace(/\b\w/g, (char) => char.toUpperCase()) 
                }
              </h2>
              <p className="text-gray-400 mt-2">({member.name})</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No members found</p>
      )}
    </div>
  );
};

export default ClubMembers;
