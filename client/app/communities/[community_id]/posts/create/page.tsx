"use client"
import { UserContext } from "@/components/AuthProvider";
import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { PostInterface } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { getCookie } from "@/lib/getters";

const sendRequest = async (url: string, { arg }: { arg: PostInterface}) => {
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


const page = ({params}: {params: {community_id: number}}) => {
  const router = useRouter()
  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/v1/communities/${params.community_id}/posts`,
    sendRequest
  );

  if(data) {
    router.push(`/communities/${params.community_id}/posts/${data.id}`)
  }
  return (
    <div>
    <Typography variant="h5">create a post</Typography>

    <Formik
      initialValues={{
        title: "",
        body: "",
      }}
      onSubmit={(values: PostInterface) => trigger(values)}
    >
      <Form>
        <label htmlFor="title">title</label>
        <Field id="title" name="title" placeholder="title" />
        <label htmlFor="body">body</label>
        <Field id="body" name="body" placeholder="body"/>
        <Button type="submit">Create</Button>
      </Form>
    </Formik>
  </div>
  )
}

export default page