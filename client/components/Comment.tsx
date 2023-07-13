"use client"
import { CommentType } from "@/lib/types";

const Comment = ({ comment }: { comment: CommentType }) => {
  const mappedComment = (comments: Array<CommentType>) => (comments.map(comment => <Comment key={comment.id} comment={comment}/>))
  return (
    <div>
      <p>{comment.body}</p>
      {comment.child_comment?mappedComment(comment.child_comment):<></>}
    </div>
  );
};

export default Comment;
