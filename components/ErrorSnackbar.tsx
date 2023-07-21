"use client";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const ErrorSnackbar = ({
  error,
  open,
  setOpen,
}: {
  error: any;
  open: boolean;
  setOpen: any;
}) => {
  return (
    <>
      {error ? (
        <Snackbar open={open} onClose={() => setOpen(false)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default ErrorSnackbar;
