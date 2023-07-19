import { CommunityType } from "@/lib/types";
import { ListItem, Link } from "@mui/material";

const CommunityCard = ({ community }: { community: CommunityType }) => {
  
  return (
    <ListItem>
      <Link href={`/communities/${community.id}/posts`} underline="none">{community.name}</Link>
    </ListItem>
  );
};

export default CommunityCard;
