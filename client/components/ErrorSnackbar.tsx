"use client"
import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"

const ErrorSnackbar = ({error}: {error: any}) => {
    const [open, setOpen] = useState(true)

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity="error">{error.message}</Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar