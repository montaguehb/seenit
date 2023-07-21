"use client";
import Comment from "@/components/Comment";
import { Container, Typography } from "@mui/material";
import { CommentType } from "@/lib/types";
import useSWR from "swr";
import { DataObject } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReplyButton from "@/components/comments/ReplyButton";

const fetcher = async (url: string) => {
  const resp = await fetch(url);
  if (resp.ok) {
    return await resp.json();
  }
};

const Post = ({
  params,
}: {
  params: { community_id: string; post_id: string };
}) => {
  const { data, error } = useSWR(
    `/api/communities/${params.community_id}/posts/${params.post_id}`,
    fetcher
  );
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (data) {
      setComments(
        data.comment.map((comment: CommentType) => (
          <Comment key={comment.id} comment={comment} />
        ))
      );
    }
  }, [data]);

  return (
    <>
      <Container>
        <Typography variant="h2">{data?.title}</Typography>
        <Typography>{data?.body}</Typography>
        <Typography>Comments:</Typography>
        <ReplyButton parent_comment={{id: 0, post_id: parseInt(params.post_id)}}/>
      </Container>
      {comments}
    </>
  );
};

export default Post;
