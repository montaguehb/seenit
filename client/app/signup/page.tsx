"use client";
import { UserContext } from "@/components/AuthProvider";
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import useSWRMutation from "swr/mutation";
import { ValuesInterface } from "@/lib/types"

const sendRequest = async (url: string, { arg }: { arg: ValuesInterface }) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  return await resp.json();
};

const Signup = () => {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/v1/signup",
    sendRequest
  );
  const { updateUser } = useContext(UserContext);

  if (data) {
    updateUser(data);
  }

  return (
    <div>
      <h1>login</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={(values: ValuesInterface) => trigger(values)}
      >
        <Form>
          <label htmlFor="username">username</label>
          <Field id="username" name="username" placeholder="username" />
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="email" type="email" />
          <label htmlFor="password">password</label>
          <Field
            id="password"
            name="password"
            placeholder="password"
            type="password"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
