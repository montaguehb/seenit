import { GetServerSideProps } from "next";
import useSWR from "swr";
import styles from "../styles/page.module.css";
import { useEffect } from "react";

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
  const { data } = useSWR('/api/v1/posts')

  return <main className={styles.main}></main>;
}
