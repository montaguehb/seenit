"use client"
import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"

const ErrorSnackbar = ({error}: {error: any}) => {
    const [open, setOpen] = useState(true)

  return (
    <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert severity="error">{error}</Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar