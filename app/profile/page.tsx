import DeleteUser from "@/components/users/DeleteUser";
import EmailForm from "@/components/users/EmailForm";
import { Button } from "@mui/material";
import Link from "next/link";

const getData = async (params: any) => {
  const resp = await fetch(`http://localhost:5000/api/users/${params.user_id}`, { cache: 'no-store' })
  if (resp.ok) {
    return resp.json()
  }
}

const Profile = async ({ params }: { params: { user_id: string } }) => {
  const data = await getData(params);

  return (
    <>
      <Button href={`/api/profile/${params.user_id}/posts`}>posts</Button>
      <EmailForm />
      <DeleteUser />
    </>
  );
};

export default Profile;
