"use client";
import { UserContext } from "@/components/AuthProvider";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { AuthInterface } from "@/lib/types";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid, Link } from "@mui/material";
import { ErrorContext } from "@/components/providers/ErrorProvider";

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
    throw error
  }
};

const Login = () => {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username cannot be less than 2 characters")
      .max(20, "Username cannot be greater than 20 characters")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username must be only letters and numbers with no spaces"
      )
      .required("Please enter a username between 2 and 20 characters"),
    password: Yup.string().required("Please enter a password"),
  });
  const { contextError, updateError} = useContext(ErrorContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      trigger(values);
    },
  });

  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/login",
    sendRequest
  );
  const { updateUser } = useContext(UserContext);

  const router = useRouter();
  useEffect(() => {
    if (data) {
      router.push("/");
      updateUser(data.user);
    } else if (error) {
      updateError(error.message);
    } else if (formik.errors && formik.errors.username !== contextError) {
      updateError(formik.errors.username);
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            autoComplete="username"
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
