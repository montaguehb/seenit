import { useRouter } from "next/router";
import useSWR from "swr";

const Post = () => {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
    `/api/v1/communities/${router.query.community_id}/posts/${router.query.id}`
  );

  return <div>{router.query.id}</div>;
};

export default Post;
