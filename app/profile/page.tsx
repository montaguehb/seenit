import DeleteUser from "@/components/users/DeleteUser";
import EmailForm from "@/components/users/EmailForm";
import { Button } from "@mui/material";
import Link from "next/link";

const Profile = async ({ params }: { params: { user_id: string } }) => {

  return (
    <>
      <Button href={`/api/profile/${params.user_id}/posts`}>posts</Button>
      <EmailForm />
      <DeleteUser />
    </>
  );
};

export default Profile;
