import DeleteUser from "@/components/users/DeleteUser";
import EmailForm from "@/components/users/EmailForm";
import { Button } from "@mui/material";
import Link from "next/link";

const Profile = async () => {
  const response = await fetch(`/api/users/1`, {
    cache: "no-store",
  });
  const data = await response.json();
  return (
    <>
      <Button href="/api/profile/1/posts">posts</Button>
      <EmailForm />
      <DeleteUser />
    </>
  );
};

export default Profile;
