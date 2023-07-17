import PostCollection from "@/components/PostCollection";
import JoinButton from "@/components/communities/JoinButton";
import { Box } from "@mui/material";

const Posts = async ({ params }: { params: { community_id: string } }) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/communities/${params.community_id}/posts`,
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
    </Box>
  );
};

export default Posts;
