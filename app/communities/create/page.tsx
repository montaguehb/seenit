"use client";
import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { getCookie } from "@/lib/getters";
import { UserContext } from "@/components/AuthProvider";
<<<<<<< HEAD
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
=======
import ErrorSnackbar from "@/components/ErrorSnackbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
>>>>>>> 2b969094b6a9abe259d7fd859ed57ef5e2d98a17
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import * as Yup from "yup"
import { ErrorContext } from "@/components/providers/ErrorProvider";
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
    "/api/communities",
    sendRequest
  );
  const {user, updateUser} = useContext(UserContext)
  const {contextError, updateError} = useContext(ErrorContext)
  const router = useRouter();
<<<<<<< HEAD
=======
  useEffect(() => {
    if (data) {
      router.push(`/communities/${data.community_id}/posts`);
      updateUser({...user, user_community: [...user.user_community, {community: {...data.community}}]})
    }

  }, [data]);
>>>>>>> 2b969094b6a9abe259d7fd859ed57ef5e2d98a17


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

  const formik = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema: communitySchema,
    onSubmit: (values) => {
      trigger(values);
    },
  });

  useEffect(() => {
    if (data) {
      router.push(`/communities/${data.community_id}/posts`);
      updateUser({...user, user_community: [...user.user_community, {community: {...data.community}}]})
    }else if (error) {
      updateError(error.message);
    } else if (formik.errors && formik.errors.name !== contextError) {
      updateError(formik.errors.name);
    }

  }, [data, formik.errors, error]);
  
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
        Create a New Community
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Community
        </Button>
      </Box>
    </Box>
  </Container>
  );
};

export default Create;
