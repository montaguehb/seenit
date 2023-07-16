"use client";

import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { UserContext } from "../AuthProvider";

const sendRequest = async (
  url: string,
  {
    arg: { id, community_id, joined, user_id },
  }: { arg: { id: number | undefined, community_id: string; joined: boolean; user_id: any } }
) => {
  const resp = await fetch(url, {
    method: joined ? "DELETE" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joined?{id: id}:{community_id: community_id, user_id: user_id}),
  });
  if (resp.ok) {
    return await resp.json();
  }
};

const JoinButton = ({ community_id }: { community_id: string }) => {
  const { user, updateUser } = useContext(UserContext);
  const [joined, setJoined] = useState(
    user.user_community[parseInt(community_id) - 1].community_id ===
      community_id
  );
  const userCommunityId = user.user_community[parseInt(community_id) - 1].id;
  const { trigger, data, isMutating, error } = useSWRMutation(
    joined
      ? `/api/v1/usercommunities/${userCommunityId}`
      : "/api/v1/usercommunities",
    sendRequest
  );

  useEffect(() => {
    if (joined) {
    } else {
      updateUser({...user, user_community: [...user.user_community, data]})
    }
    setJoined(!joined);
  }, [data]);

  const handleClick = () => {
    trigger({ id: userCommunityId, community_id, joined, user_id: user.id });
  };

  return <Button onClick={handleClick}>{joined ? "leave" : "join"}</Button>;
};

export default JoinButton;
