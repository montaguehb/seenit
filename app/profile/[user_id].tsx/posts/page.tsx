import PostCollection from "@/components/PostCollection";

const getData = async (params: any) => {
  const resp = await fetch(
    `http://localhost:5000/api/users/${params.user_id}/posts`,
    { cache: "no-store" }
  );
  if (resp.ok) {
    return resp.json();
  }
};

export default async function Home({
  params,
}: {
  params: { user_id: string };
}) {
  const data = await getData(params);

  return <>{params.user_id ? <PostCollection posts={data} /> : null}</>;
}
