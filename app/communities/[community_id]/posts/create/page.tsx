"use client";
import { UserContext } from "@/components/AuthProvider";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { PostInterface } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getCookie } from "@/lib/getters";
import * as Yup from "yup";
import ErrorSnackbar from "@/components/ErrorSnackbar";

const sendRequest = async (url: string, { arg }: { arg: PostInterface }) => {
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

const Page = ({ params }: { params: { community_id: number } }) => {
  const postSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, "Title must be between 1 and 50 characters")
      .max(50, "Title must be between 1 and 50 characters")
      .required("Please enter a title"),
    body: Yup.string()
      .min(1, "Body must be between 1 and 500 characters")
      .max(500, "Body must be between 1 and 500 characters")
      .required("Please enter a post body"),
  });

  const router = useRouter();
  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/communities/${params.community_id}/posts`,
    sendRequest
  );

  if (data) {
    debugger
    router.push(`/communities/${params.community_id}/posts/${data.id}`);
  }
  return (
    <div>
      <Typography variant="h5">create a post</Typography>

      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        validationSchema={postSchema}
        onSubmit={(values: PostInterface) => trigger(values)}
      >
        <Form>
          <label htmlFor="title">title</label>
          <Field id="title" name="title" placeholder="title" />
          <ErrorMessage name="title">
            {(error: string) => <ErrorSnackbar error={error}></ErrorSnackbar>}
          </ErrorMessage>
          <label htmlFor="body">body</label>
          <Field id="body" name="body" placeholder="body" />
          <ErrorMessage name="body">
            {(error: string) => <ErrorSnackbar error={error}></ErrorSnackbar>}
          </ErrorMessage>
          <Button type="submit">Create</Button>
        </Form>
      </Formik>
      {error ? <ErrorSnackbar error={error.message} /> : null}
    </div>
  );
};

export default Page;
