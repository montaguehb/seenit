import styles from "../styles/page.module.css";
import PostCollection from "@/components/PostCollection";

export default async function Home() {
  const resp = await fetch("http://localhost:5000/api/v1/posts", { cache: 'no-store' })
  const data = await resp.json()

  return (
    <main className={styles.main}>
      <PostCollection posts={data} />
    </main>
  );
}
