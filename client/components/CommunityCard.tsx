import { CommunityType } from "@/lib/types";
import Link from "next/link";

const CommunityCard = ({ community }: { community: CommunityType }) => {
  
  return (
    <div>
      <Link href={`/communities/${community.id}/posts`}>{community.name}</Link>
    </div>
  );
};

export default CommunityCard;
