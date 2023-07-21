"use client";
import { UserContext } from "@/components/AuthProvider";
import { useFormik } from "formik";
import { useContext } from "react";
import useSWRMutation from "swr/mutation";
import { PostInterface } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getCookie } from "@/lib/getters";
import * as Yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ErrorContext } from "@/components/providers/ErrorProvider";
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
  } else {
    const error_message = await resp.json();
    const error = new Error(error_message.error);
    throw error;
  }
};
const Page = ({ params }: { params: { community_id: number } }) => {

  const { contextError, updateError} = useContext(ErrorContext);

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

const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      trigger(values);
    },
  });

  if (data) {
    router.push(`/communities/${params.community_id}/posts/${data.id}`);
  }
  else if (error) {
    updateError(error.message);
  } else if (formik.errors && Object.values(formik.errors).find(error => !!error) !== contextError) {
    updateError(Object.values(formik.errors).find(error => !!error));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a Post
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="body"
            label="body"
            type="body"
            id="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.body && Boolean(formik.errors.body)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
