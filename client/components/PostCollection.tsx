import PostCard from "./PostCard";
import Link from "next/link";
import { PostProps } from "@/lib/types";


const PostCollection = ({ posts }: { posts: Array<PostProps> }) => {
  const mappedPosts = posts.map((post) => {
    return (
        <PostCard  post={post} />
    );
  });

  return <div>{mappedPosts}</div>;
};

export default PostCollection;
