"use client";
import { Button } from "@mui/material";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { useContext, useEffect } from "react";
import { UserContext } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { ErrorContext } from "../providers/ErrorProvider";

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
  const {contextError, updateError} = useContext(ErrorContext)
  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/users/${user?.id}`,
    sendRequest
  );

  useEffect(() => {
    if (data) {
        router.push("/");
        updateUser(null);
    }
    else if (error && error !== contextError ) {
      updateError(error)
    }
  }, [data, error]);

  return (
    <>
      <Button onClick={() => trigger()}>Delete User</Button>
    </>
  );
};

export default DeleteUser;
