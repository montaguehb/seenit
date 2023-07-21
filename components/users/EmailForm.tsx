"use client";
import { Formik, Form, Field } from "formik";
import { Typography, Button } from "@mui/material";
import ErrorSnackbar from "../ErrorSnackbar";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../AuthProvider";
import { useRouter } from "next/navigation";

const sendRequest = async (
  url: string,
  { arg }: { arg: { email: string } }
) => {
  const resp = await fetch(url, {
    method: "PATCH",
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

const EmailForm = () => {
  const [editing, setEditing] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/users/${user?.id}`,
    sendRequest
  );
  useEffect(() => {
    if (data) {
      router.push("/");
      updateUser(data.user);
    }
  }, [data]);

  if (editing) {
    return (
      <div>
        <h1>login</h1>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => trigger(values)}
        >
          <Form>
            <label htmlFor="email">email</label>
            <Field id="email" name="email" placeholder="email" />
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
        <Typography variant="body1">Already have an account?</Typography>
        <Button href="/signup">Signup</Button>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => {
          setEditing(!editing);
        }}
      >
        edit email
      </Button>
    );
  }
};

export default EmailForm;
