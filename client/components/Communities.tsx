"use client";
import React, { useContext } from "react";
import { UserContext } from "./AuthProvider";
import { CommunityType } from "@/lib/types";
import CommunityCard from "./CommunityCard";

const Communities = () => {
  const { user } = useContext(UserContext);
  if (user) {
    const mappedCommunities = user.user_community.map(
      ({community}: {community: CommunityType}) => {
        return <CommunityCard key={community.id} community={community} />;
      }
    );

    return <div>{ mappedCommunities }</div>;
  } else {
    return <></>;
  }
};

export default Communities;
