"use client"
import { useState } from "react";
import CommentForm from "./CommentForm";
import { Button } from "@mui/material";
import { CommentType } from "@/lib/types";

const ReplyButton = ({ parent_comment }: { parent_comment: {id: number; post_id: number;} }) => {
  const [reply, setReply] = useState(false);
  const updateReply = () => {
    setReply(!reply)
  }
  return (
    <>
      {reply ? <CommentForm parent_comment={parent_comment} updateReply={updateReply}/> : null}
      <Button onClick={()=> setReply(!reply)}>{reply?"cancel":"reply"}</Button>
    </>
  );
};

export default ReplyButton;
