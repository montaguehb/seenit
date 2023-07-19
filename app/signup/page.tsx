"use client";
import { UserContext } from "@/components/AuthProvider";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { AuthInterface } from "@/lib/types";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const sendRequest = async (url: string, { arg }: { arg: AuthInterface }) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
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
      // .matches(
      //   /[^a-zA-Z0-9]/,
      //   "Password must have at least one special character"
      // )
      .required("Please Enter a Password"),
    email: Yup.string().email().required("Please enter a valid email"),
  });

  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/signup",
    sendRequest
  );
  const { updateUser } = useContext(UserContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      trigger(values);
    },
  });

  useEffect(() => {
    if (data) {
      router.push("/");
      updateUser(data.user);
    }
  }, [data]);

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
