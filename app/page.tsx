import PostCollection from "@/components/PostCollection";

const getData = async () => {
  const resp = await fetch("http://localhost:5000/api/posts", { cache: 'no-store' })
  if (resp.ok) {
    return resp.json()
  }
}
export default async function Home() {
 
  const data = await getData()

  return (
    <main>
      <PostCollection posts={data} />
    </main>
  );
}
