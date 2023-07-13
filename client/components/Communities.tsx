"use client"
import { useContext } from "react";
import { UserContext } from "./AuthProvider";
import { CommunityType } from "@/lib/types";
import CommunityCard from "./CommunityCard";

const Communities = () => {
  const { user } = useContext(UserContext);
  const mappedCommunities = user.user_community.map(
    (community: CommunityType) => <CommunityCard community={community} />
  );
  return <div>{mappedCommunities}</div>;
};

export default Communities;
