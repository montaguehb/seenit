"use client";

import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { UserContext } from "../AuthProvider";

const sendRequest = async (
  url: string,
  {
    arg: { id, community_id, joined, user_id },
  }: {
    arg: {
      id: number | undefined;
      community_id: string;
      joined: boolean;
      user_id: any;
    };
  }
) => {
  const resp = await fetch(url, {
    method: joined ? "DELETE" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      joined ? { id: id } : { community_id: community_id, user_id: user_id }
    ),
  });
  if (resp.ok) {
    return await resp.json();
  }
};

const JoinButton = ({ community_id }: { community_id: string }) => {
  const { user, updateUser } = useContext(UserContext);
  const [joined, setJoined] = useState(false);
  const userCommunityId =
    user && user.user_community.length
      ? user.user_community.find(
          (community: any) => community.community_id === parseInt(community_id)
        )?.id
      : null;
  const { trigger, data, isMutating, error } = useSWRMutation(
    joined
      ? `/api/usercommunities/${userCommunityId}`
      : "/api/usercommunities",
    sendRequest
  );

  useEffect(() => {
    if (data) {
      if (joined) {
        updateUser({
          ...user,
          user_community: user.user_community.filter(
            (community: any) => community.community_id !== parseInt(community_id)
          ),
        });
        setJoined(!joined)
      } else {
        updateUser({
          ...user,
          user_community: [...user.user_community, data],
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (user && user.user_community.length) {
      setJoined(
        user.user_community.some(
          (community: any) => community.community_id === parseInt(community_id)
        )
      );
    }
  }, [user]);

  const handleClick = () => {
    trigger({ id: userCommunityId, community_id, joined, user_id: user.id });
  };

  return <Button onClick={handleClick}>{joined ? "leave" : "join"}</Button>;
};

export default JoinButton;
