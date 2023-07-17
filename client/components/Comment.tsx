import { CommentType } from "@/lib/types";
import ReplyButton from "./comments/ReplyButton";

const Comment = ({ comment }: { comment: CommentType }) => {
  const mappedComment = (comments: Array<CommentType>) =>
    comments.map((comment) => <Comment key={comment.id} comment={comment} />);
  return (
    <div>
      <p>{comment.body}</p>
      <ReplyButton parent_comment={comment}/>
      {comment.child_comment ? mappedComment(comment.child_comment) : <></>}
    </div>
  );
};

export default Comment;
