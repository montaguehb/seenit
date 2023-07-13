import { CommunityType } from "@/lib/types"
import Link from "next/link"

const CommunityCard = ({community} : {community: CommunityType}) => {
  return (
    <Link href={`/communities/${community.id}/posts`}>{community.name}</Link>
  )
}

export default CommunityCard