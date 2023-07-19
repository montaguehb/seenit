"use client";
import { Button } from "@mui/material";
import ErrorSnackbar from "../ErrorSnackbar";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { useContext, useEffect } from "react";
import { UserContext } from "../AuthProvider";
import { useRouter } from "next/navigation";

const sendRequest = async (url: string) => {
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      "Content-Type": "application/json",
    },
  });
  if (resp.ok) {
    return await resp.json();
  } else {
    const error_message = await resp.json();
    const error = new Error(error_message.error);
    throw error;
  }
};

const DeleteUser = () => {
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/users/${user?.id}`,
    sendRequest
  );

  useEffect(() => {
    if (data) {
        router.push("/");
        updateUser(null);
    }
  }, [data]);

  return (
    <>
      <Button onClick={() => trigger()}>Delete User</Button>
      {error ? <ErrorSnackbar error={error} /> : <></>}
    </>
  );
};

export default DeleteUser;
