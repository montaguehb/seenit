import { AppProps } from "next/app";
import PostCard from "./PostCard";

type Community = {
    id: number,
    name: string,
    subscribers: number
}

interface PostProps {
    id: number,
    likes: number,
    dislikes: number,
    title: string,
    community: Community
}


const PostCollection = ({ posts }: {posts: Array<PostProps>}) => {

  const mappedPosts = posts.map((post) => {
    return <PostCard key={post.id} post={post} />;
  });

  return <div>{mappedPosts}</div>;
};

export default PostCollection;
