"use client"
import { useState } from "react";
import CommentForm from "./CommentForm";
import { Button } from "@mui/material";
import { CommentType } from "@/lib/types";

const ReplyButton = ({ parent_comment }: { parent_comment: CommentType }) => {
  const [reply, setReply] = useState(false);
  return (
    <div>
      {reply ? <CommentForm parent_comment={parent_comment} /> : <></>}
      <Button onClick={()=> setReply(!reply)}>{reply?"cancel":"reply"}</Button>
    </div>
  );
};

export default ReplyButton;
