import { useEffect } from "react";
import { useGetClubMembers } from "../../lib/react-query/queriesAndMutation";

const About = () => {
  // const {
  //   data: clubMembers,
  //   isLoading: clubMembersLoading,
  //   isError: clubMembersError
  // } = useGetClubMembers();

  // useEffect(() => {
  //   console.log("Club members fetched:", clubMembers);
  // }, [clubMembers]);

  return (
    <div>About</div>
  )
}

export default About