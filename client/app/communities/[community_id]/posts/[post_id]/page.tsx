import Comment from "@/components/Comment";
import { CommentType } from "@/lib/types";
const Post = async ({
  params,
}: {
  params: { community_id: string; post_id: string };
}) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/communities/${params.community_id}/posts/${params.post_id}`,
    { cache: 'no-store' }
  );
  const data: {body: string; comment: Array<CommentType>} = await response.json();
  const comments = data.comment.map(comment => <Comment key={comment.id} comment={comment}/>)

  return (
    <div>
      <p>{data.body}</p>
      <p>Comments:</p>
      {comments}
    </div>
  );
};

export default Post;
