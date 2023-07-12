"use client"
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import useSWRMutation from "swr/mutation";

interface Values {
  username: string;
  password: string;
}

const sendRequest = async (url: string, { arg }: { arg: Values }) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(arg),
  });
  return await resp.json();
};

const Login = () => {
  const { trigger, data, isMutating, error } = useSWRMutation("/api/v1/login", sendRequest);

  if(data) {

  }
  return (
    <div>
      <h1>login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values: Values) => trigger(values)}
      >
        <Form>
          <label htmlFor="username">username</label>
          <Field id="username" name="username" placeholder="username" />
          <label htmlFor="password">password</label>
          <Field id="password" name="password" placeholder="password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
