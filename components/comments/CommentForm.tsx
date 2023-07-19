"use client";

import { Typography, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../AuthProvider";
import { Form, Formik, Field } from "formik";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { CommentType } from "@/lib/types";
import { useRouter } from "next/navigation";
import ErrorSnackbar from "../ErrorSnackbar";
const sendRequest = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      body: string;
      user_id: number;
      parent_comment_id: number;
      post_id: number;
    };
  }
) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  if (resp.ok) {
    return await resp.json();
  }
  else {
    const error_message = await resp.json();
    const error = new Error(error_message.error);
    throw error;
  }
};

const CommentForm = ({
  parent_comment,
  updateReply,
}: {
  parent_comment: {id: number; post_id: number;};
  updateReply: any;
}) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/comments",
    sendRequest
  );

  useEffect(() => {
    if (data) {
      router.refresh();
      updateReply();
    }
  }, [data]);

  return (
    <div>
      <Typography variant="h5">comment as {user?.username}</Typography>
      <Formik
        initialValues={{
          body: "",
        }}
        onSubmit={(values: { body: string }) =>
          trigger({
            ...values,
            user_id: user.id,
            parent_comment_id: parent_comment.id,
            post_id: parent_comment.post_id,
          })
        }
      >
        <Form>
          <label htmlFor="body">comment</label>
          <Field id="body" name="body" placeholder="comment..." />
          <Button type="submit">Create</Button>
        </Form>
      </Formik>
      {error?<ErrorSnackbar error={error.message}/>:<></>}
    </div>
  );
};

export default CommentForm;
