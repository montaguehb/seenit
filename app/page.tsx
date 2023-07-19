"use client"
import PostCollection from "@/components/PostCollection";
import useSWR from "swr"

const fetcher = async (url: string) => {
  const resp = await fetch(url)
  if (resp.ok) {
    return await resp.json()
  }
}
export default function Home() {
  
  const {data} = useSWR("/api/posts", fetcher)

  return (
    <main>
      <PostCollection posts={data} />
    </main>
  );
}
