import React, { useEffect, useState } from 'react';
import { useSearchUsers } from '../../../lib/react-query/queriesAndMutation';
import useDebounce from '../../../../../userPage/src/hooks/useDbounce';
import { useInView } from 'react-intersection-observer';
import SearchUserCard from '../../../components/shared/SearchUserCard';

const ViewAllUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const deBouncedValue = useDebounce(searchQuery, 1000);

  const {
    data: searchUsers, isFetching: isSearchFetching, isError: searchError
  } = useSearchUsers(deBouncedValue);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !searchQuery) {
      // Implement pagination if needed.
    }
  }, [inView, searchQuery]);

  // Log searchUsers to ensure you have the data structure
  // console.log(searchUsers);

  return (
    <>
      <div>
        <div className="w-full mt-20 rounded-lg shadow-lg p-6 relative overflow-hidden border-2 border-white">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by user name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            aria-label="Search Users"
          />

          {/* Results Section */}
          <div className="overflow-y-auto max-h-[60vh]">
            {isSearchFetching ? (
              <div className="text-center text-gray-500">Searching...</div>
            ) : searchUsers?.documents?.length > 0 ? (
              searchUsers.documents.map((user, index) => (
                <SearchUserCard key={index} user={user} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
                <h2>No results found.</h2>
                <p>Try a different search term or browse recent users.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllUsers;
