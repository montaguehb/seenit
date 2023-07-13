import Comment from "@/components/Comment";

const Post = async ({
  params,
}: {
  params: { community_id: string; post_id: string };
}) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/communities/${params.community_id}/posts/${params.post_id}`,
    { cache: 'no-store' }
  );
  const data = await response.json();
  const comments = [[<Comment comment={data.comment[0]}/>, [<Comment comment={data.comment[0].child_comment[0]}/>, <Comment comment={data.comment[0].child_comment[1]}/>]], <Comment comment={data.comment[1]}/>]
  return (
    <div>
      <p>{data.body}</p>
      <p>Comments:</p>
      {comments}
    </div>
  );
};

export default Post;
