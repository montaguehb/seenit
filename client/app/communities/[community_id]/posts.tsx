import PostCollection from "@/components/PostCollection";
import { useRouter } from "next/router";
import useSWR from "swr";

const Posts = () => {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(() =>
    router.query.community_id
      ? `/api/v1/communities/${router.query.community_id}/posts`
      : null
  );
  if (isLoading || !data) {
    return <p>loading</p>;
  } else if (error) {
    return <p>error</p>;
  }
  return (
    <PostCollection
      posts={data.post.map((post: any) => {
        post["community"] = {
          id: data.id,
          name: data.name,
        };
        return post;
      })}
    />
  );
};

export default Posts;
