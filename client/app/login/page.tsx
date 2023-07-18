"use client"
import { UserContext } from "@/components/AuthProvider";
import { Formik, Field, Form } from "formik";
import { useContext, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { AuthInterface } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ErrorSnackbar from "@/components/ErrorSnackbar";


const sendRequest = async (url: string, { arg }: { arg: AuthInterface }) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(arg),
  });
  if (resp.ok) {
    return await resp.json();
  }
  else {
    const error_message = await resp.json()
    const error = new Error(error_message.error)
    throw error
  }
};

const Login = () => {
  const { trigger, data, isMutating, error } = useSWRMutation("/api/v1/login", sendRequest);
  const { updateUser } = useContext(UserContext)

  const router = useRouter()
  useEffect(() => {
    if(data) {
      router.push("/")
      updateUser(data.user)
    }
  }, [data])

  return (
    <div>
      <h1>login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values: AuthInterface) => trigger(values)}
      >
        <Form>
          <label htmlFor="username">username</label>
          <Field id="username" name="username" placeholder="username" />
          <label htmlFor="password">password</label>
          <Field id="password" name="password" placeholder="password" type="password" />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
      <Typography variant="body1">Already have an account?</Typography>
      <Button href="/signup">Signup</Button>
      {error?<ErrorSnackbar error={error}/>:<></>}
    </div>
  );
};

export default Login;
