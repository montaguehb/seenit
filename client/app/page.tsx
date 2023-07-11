"use client"
import useSWR from "swr";
import styles from "../styles/page.module.css";
import PostCollection from "@/components/PostCollection";

export default function Home() {
  const { data, isLoading, error } = useSWR("/api/v1/posts");

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Unable to load posts</p>;
  }

  return (
    <main className={styles.main}>
      <PostCollection posts={data} />
    </main>
  );
}
