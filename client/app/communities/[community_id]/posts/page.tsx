import PostCollection from "@/components/PostCollection";

const Posts = async ({ params }: { params: { community_id: string } }) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/communities/${params.community_id}/posts`,
    { cache: "no-store" }
  );
  const dynamicData = await response.json();

  return (
    <PostCollection
      posts={dynamicData.post.map((post: any) => {
        post["community"] = {
          id: dynamicData.id,
          name: dynamicData.name,
        };
        return post;
      })}
    />
  );
};

export default Posts;
