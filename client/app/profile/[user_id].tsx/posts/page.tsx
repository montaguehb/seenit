import PostCollection from "@/components/PostCollection";

export default async function Home({ params }: { params: { user_id: string } }) {
  const resp = await fetch(`http://localhost:5000/api/v1/users/${params.user_id}/posts`, { cache: 'no-store' })
  const data = await resp.json()

  return (
    <PostCollection posts={data} />
  );
}