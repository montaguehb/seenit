import { CommentType } from "@/lib/types";
import ReplyButton from "./comments/ReplyButton";
import { Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Comment = ({ comment }: { comment: CommentType }) => {
  const mappedComment = (comments: Array<CommentType>) =>
    comments.map((comment) => <Comment key={comment.id} comment={comment} />);
  return (
    <>
      <br />
      <Container>
        <Typography variant="body1">{comment.body}</Typography>
        <ReplyButton
          parent_comment={{ id: comment.id, post_id: comment.post_id }}
        />
        {comment.child_comment ? mappedComment(comment.child_comment) : <></>}
      </Container>
    </>
  );
};

export default Comment;
