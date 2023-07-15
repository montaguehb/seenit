import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { ComponentProps } from "react";

const PostCard = ({ post }: ComponentProps<any>) => {
  let timeDif = (Date.now() - Date.parse(`${post.created_at} GMT`)) / 1000;
  timeDif = Math.floor(timeDif / 3600);
  return (
    <Card>
      <CardActionArea
        href={`/communities/${post.community.id}/posts/${post.id}`}
      >
        <CardContent>
          <Typography variant="h6">
            Posted in: {post.community.name} by {post.user.username} {`${timeDif} hours ago`}
          </Typography>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="body1">{post.body.substring(0, 500)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
