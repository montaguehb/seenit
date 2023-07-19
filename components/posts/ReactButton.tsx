"use client";

import { Button, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../AuthProvider";
import useSWRMutation from "swr/mutation";

const sendRequest = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      post_id?: number;
      liked?: number;
      user_post?: any | boolean;
      user_id?: any;
    };
  }
) => {
  const resp = await fetch(url, {
    method: arg.user_post ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: arg.post_id,
      liked: arg.liked,
      user_id: arg.user_id,
    }),
  });
  if (resp.ok) {
    return await resp.json();
  }
};

const ReactButton = ({ postId }: { postId: number }) => {
  const { user, updateUser } = useContext(UserContext);

  const userPost =
    user && user.user_post.length
      ? user.user_post.find((post: any) => post.post_id === postId)
      : 0;
  const [liked, setLiked] = useState(userPost?.liked);
  const { trigger, data, isMutating, error } = useSWRMutation(
    userPost ? `/api/userposts/${userPost.id}` : "/api/userposts",
    sendRequest
  );

  useEffect(() => {
    if (data) {
      if (userPost) {
        updateUser({
          ...user,
          user_post: user.user_post.map((post: any) =>
            post.post_id === postId ? data : post
          ),
        });
      } else {
        updateUser({
          ...user,
          user_post: [...user.user_post, data],
        });
      }
      setLiked(data.liked);
    }
  }, [data]);

  useEffect(() => {
    if (user && user.user_post.length) {
      setLiked(
        user.user_post.find((post: any) => post.post_id === postId)?.liked
      );
    }
  }, [user]);
  
  const handleClick = (liked: number) => {
    trigger({ post_id: postId, liked: liked, user_id: user.id, user_post: userPost});
  };

  return (
    <>
      <Button onClick={() => handleClick(liked===1?0:1)}>
        <Typography variant="h4">{liked === 1?"⬆":"⇧"}</Typography>
      </Button>
      <Button onClick={() => handleClick(liked===-1?0:-1)}>
        <Typography variant="h4">{liked === -1?"⬇":"⇩"}</Typography>
      </Button>
    </>
  );
};

export default ReactButton;
