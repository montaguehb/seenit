"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { getCookie } from "@/lib/getters";
import { UserContext } from "@/components/AuthProvider";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import * as Yup from "yup"
const sendRequest = async (url: string, { arg }: { arg: { name: string } }) => {
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

const Create = () => {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/v1/communities",
    sendRequest
  );
  const {user, updateUser} = useContext(UserContext)

  const router = useRouter();
  useEffect(() => {
    if (data) {
      router.push(`/communities/${data.community_id}/posts`);
      updateUser({...user, user_community: [...user.user_community, {community: {...data.community}}]})
    }
  }, [data]);

  const communitySchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Community can not be less than 1 character")
      .max(20, "Community can not be greater than 20 characters")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Community must be only letters and numbers with no spaces"
      )
      .required("Please enter a community name between 2 and 20 characters"),
  });
  return (
    <div>
      <h1>Create a community</h1>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={communitySchema}
        onSubmit={(values: { name: string }) => trigger(values)}
      >
        <Form>
          <label htmlFor="name">name</label>
          <Field id="name" name="name" placeholder="name" />
          <ErrorMessage name="name">
              {(error: string) => <ErrorSnackbar error={error}></ErrorSnackbar>}
          </ErrorMessage>
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
      {error?<ErrorSnackbar error={error.message} />:null}
    </div>
  );
};

export default Create;
