import useSWR from "swr";
import styles from "../styles/page.module.css";
import PostCollection from "@/components/PostCollection";

// type Community = {
//   id: number,
//   name: string,
//   subscribers: number
// }

// type Post = {
//   id: number,
//   likes: number,
//   dislikes: number,
//   title: string,
//   community: Community,
//   created_at: string,
//   updated_at: string,
// }

export default function Home() {
  const { data, isLoading, error } = useSWR('/api/v1/posts')

  if (isLoading) {
    return <p>Loading...</p>
  }
  else if (error) {
    return <p>Unable to load posts</p>
  }

  return <main className={styles.main}>
    <PostCollection posts={data} />
  </main>;
}
