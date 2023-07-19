"use client";

import { Typography, Button, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../AuthProvider";
import { useFormik } from "formik";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { ErrorContext } from "../providers/ErrorProvider";

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
  } else {
    const error_message = await resp.json();
    const error = new Error(error_message.error);
    throw error;
  }
};

const CommentForm = ({
  parent_comment,
  updateReply,
}: {
  parent_comment: { id: number; post_id: number };
  updateReply: any;
}) => {
  const commentSchema = Yup.object().shape({
    body: Yup.string()
      .min(1, "Comments must be at least 1 character")
      .max(500, "Comments can not be more than 500 characters")
      .required("Please enter a comment"),
  });
  const { user } = useContext(UserContext);
  const { contextError, updateError} = useContext(ErrorContext);
  const router = useRouter();
  const { trigger, data, error } = useSWRMutation("/api/comments", sendRequest);

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values) => {
      trigger({
        ...values,
        user_id: user.id,
        parent_comment_id: parent_comment.id,
        post_id: parent_comment.post_id,
      });
    },
  });

  useEffect(() => {
    if (data) {
      router.refresh();
      updateReply();
    } else if (error) {
      updateError(error.message);
    } else if (formik.errors && formik.errors.body !== contextError) {
      updateError(formik.errors.body);
    }
  }, [
    data,
    error,
    router,
    updateError,
    updateReply,
    formik.errors,
    contextError
  ]);

  return (
    <div>
      {user ? (
        <Typography variant="h5">comment as {user.username}</Typography>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="body"
          name="body"
          label="comment"
          placeholder="comment..."
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CommentForm;
