import PostCollection from "@/components/PostCollection";
import JoinButton from "@/components/communities/JoinButton";
import { Box, Button } from "@mui/material";

const Posts = async ({ params }: { params: { community_id: string } }) => {
  const response = await fetch(
    `/api/v1/communities/${params.community_id}/posts`,
    { cache: "no-store" }
  );
  const dynamicData = await response.json();

  return (
    <Box>
      <PostCollection
        posts={dynamicData.post.map((post: any) => {
          post["community"] = {
            id: dynamicData.id,
            name: dynamicData.name,
          };
          return post;
        })}
      />
      <JoinButton community_id={params.community_id} />
      <Button href={`/communities/${params.community_id}/posts/create`}>Create Post</Button>
    </Box>
  );
};

export default Posts;
