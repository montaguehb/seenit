import Comment from "@/components/Comment";
import { Container, Typography } from "@mui/material";
import { CommentType } from "@/lib/types";
const Post = async ({
  params,
}: {
  params: { community_id: string; post_id: string };
}) => {
  const response = await fetch(
    `http://localhost:5000/api/communities/${params.community_id}/posts/${params.post_id}`,
    { cache: "no-store" }
  );
  const data: { body: string; comment: Array<CommentType>; title: string; } =
    await response.json();
  const comments = data.comment.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return (
    <>
      <Container>
        <Typography variant="h2">{data.title}</Typography>
        <Typography>{data.body}</Typography>
        <Typography>Comments:</Typography>
      </Container>
      {comments}
    </>
  );
};

export default Post;
