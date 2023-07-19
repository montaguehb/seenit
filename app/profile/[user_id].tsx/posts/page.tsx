"use client"
import PostCollection from "@/components/PostCollection";
import useSWR from "swr"

const fetcher = async (url: string) => {
  const resp = await fetch(
    url
  );
  if (resp.ok) {
    return resp.json();
  }
};

export default function Home({
  params,
}: {
  params: { user_id: string };
}) {
  const {data} = useSWR(`/api/users/${params.user_id}/posts`, fetcher);

  return <>{params.user_id ? <PostCollection posts={data} /> : null}</>;
}
