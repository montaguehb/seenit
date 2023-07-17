"use client";

import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../AuthProvider";
import { Form, Formik, Field } from "formik";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { CommentType } from "@/lib/types";
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
};

const CommentForm = ({ parent_comment }: { parent_comment: CommentType }) => {
  const { user } = useContext(UserContext);
  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/v1/comments",
    sendRequest
  );
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
    </div>
  );
};

export default CommentForm;
