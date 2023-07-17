"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthProvider";
import { CommunityType } from "@/lib/types";
import CommunityCard from "./CommunityCard";
import { Button } from "@mui/material";

const Communities = () => {
  const { user } = useContext(UserContext);
  const [mappedCommunities, setMappedCommunities] = useState([]);

  useEffect(() => {
    if (user) {
      setMappedCommunities(
        user.user_community.map(
          ({ community }: { community: CommunityType }) => {
            return <CommunityCard key={community.id} community={community} />;
          }
        )
      );
    }
  }, [user]);

  return (
    <>
      {mappedCommunities}
      <Button href="/create">Create</Button>
    </>
  );
};

export default Communities;
