import PostCollection from "@/components/PostCollection";

export default async function Home() {
  const resp = await fetch("http://localhost:5000/api/v1/posts", { cache: 'no-store' })
  const data = await resp.json()

  return (
    <main>
      <PostCollection posts={data} />
    </main>
  );
}
