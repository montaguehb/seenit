import PostCard from "./PostCard";
import Link from "next/link";
import { PostProps } from "@/lib/types";


const PostCollection = ({ posts }: { posts: Array<PostProps> }) => {
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
