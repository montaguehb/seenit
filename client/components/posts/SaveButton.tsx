"use client"

import { useContext, useState, useEffect } from "react"
import { UserContext } from "../AuthProvider"
import Button from "@mui/material/Button"
import useSWRMutation from "swr/mutation"

const sendRequest = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      post_id?: number;
      saved?: boolean;
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
      saved: arg.saved,
      user_id: arg.user_id
    }),
  });
  if (resp.ok) {
    return await resp.json();
  }
};

const SaveButton = ({postId} : {postId: number}) => {
  const {user, updateUser} = useContext(UserContext)


  const userPost =
    user && user.user_post.length
      ? user.user_post.find(
          (post: any) => post.post_id === postId
        )
      : false;
  const [saved, setSaved] = useState(userPost?.saved)
  const { trigger, data, isMutating, error } = useSWRMutation(
    userPost
      ? `/api/v1/userposts/${userPost.id}`
      : "/api/v1/userposts",
    sendRequest
  );

  useEffect(() => {
    if (data) {
      if (userPost) {
        updateUser({
          ...user,
          user_post: user.user_post.map(
            (post: any) => post.post_id === postId?data:post
          ),
        });
      } else {
        updateUser({
          ...user,
          user_post: [...user.user_post, data],
        });
      }
      setSaved(data.saved)
    }
  }, [data]);

  useEffect(() => {
    if (user && user.user_post.length) {
      setSaved(
        user.user_post.find(
          (post: any) => post.post_id === postId
        )?.saved
      );
    }
  }, [user]);

  const handleClick = () => {
    trigger({ post_id: postId, saved: !saved, user_id: user.id, user_post: userPost});
  };

  return (
    <Button onClick={handleClick}>{saved?"unsave":"save"}</Button>
  )
}

export default SaveButton