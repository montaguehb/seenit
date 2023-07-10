import PostCard from "./PostCard";
import Link from "next/link";

type Community = {
  id: number;
  name: string;
  subscribers: number;
};

interface PostProps {
  id: number;
  likes: number;
  dislikes: number;
  title: string;
  community: Community;
}

const PostCollection = ({ posts }: { posts: Array<PostProps> }) => {
  debugger
  const mappedPosts = posts.map((post) => {
    return (
      <Link key={post.id} href={`/communities/${post.community.id}/posts/${post.id}`}>
        <PostCard  post={post} />
      </Link>
    );
  });

  return <div>{mappedPosts}</div>;
};

export default PostCollection;
