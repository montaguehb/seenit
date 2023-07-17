"use client";
import { Formik, Form, Field } from "formik";
import { Button, Typography } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const sendRequest = async (url: string, { arg }: { arg: { name: string } }) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  if (resp.ok) {
    return await resp.json();
  }
};

const Create = () => {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/v1/communities",
    sendRequest
  );
  const router = useRouter();
  useEffect(() => {
    if (data) {
      router.push(`/communities/${data.id}/posts`);
    }
  }, [data]);

  return (
    <div>
      <h1>Create a community</h1>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(values: { name: string }) => trigger(values)}
      >
        <Form>
          <label htmlFor="name">name</label>
          <Field id="name" name="name" placeholder="name" />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Create;
