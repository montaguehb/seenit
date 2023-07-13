import Link from "next/link"

const Profile = async () => {

    const response = await fetch(`http://localhost:5000/api/v1/users/1`, { cache: 'no-store' })
    const data = await response.json()
  return (
    <Link href="http://localhost:5000/api/v1/profile/1/posts">posts</Link>
  )
}

export default Profile