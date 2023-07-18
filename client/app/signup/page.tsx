"use client";
import { UserContext } from "@/components/AuthProvider";
import { Formik, Field, Form } from "formik";
import { useContext, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { AuthInterface } from "@/lib/types"
import { useRouter } from "next/navigation";
import * as Yup from "yup" 
const sendRequest = async (url: string, { arg }: { arg: AuthInterface }) => {
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
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username cannot be less than 2 characters")
      .max(20, "Username cannot be greater than 20 characters")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username must be only letters and numbers with no spaces"
      )
      .required("Please enter a username between 2 and 20 characters"),
    password: Yup.string()
      .min(10, "Password must be at least 10 characters long")
      .matches(/^\S+$/, "Password cannot contain spaces")
      .matches(/[A-Z]/, "Password must have an uppercase letter")
      .matches(/[a-z]/, "Password must have a lowercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must have at least one special character"
      )
      .required("Please Enter a Password"),
    email: Yup.string().email().required("Please Enter your Email")
  });

  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/v1/signup",
    sendRequest
  );
  const { updateUser } = useContext(UserContext);
  const router = useRouter()

  useEffect(() => {
    if(data) {
      router.push("/")
      updateUser(data.user)
    }
  }, [data])

  return (
    <div>
      <h1>signup</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values: AuthInterface) => trigger(values)}
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
