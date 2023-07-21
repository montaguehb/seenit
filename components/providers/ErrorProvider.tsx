"use client";

import { createContext, useState } from "react";
import ErrorSnackbar from "../ErrorSnackbar";

const ErrorContext = createContext<{
  contextError: string | null;
  updateError: any;
}>({
  contextError: null,
  updateError: () => {},
});

const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextError, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const updateError = (error: any) => {
    setError(error);
    setOpen(true);
  };

  return (
    <ErrorContext.Provider value={{ contextError, updateError }}>
      {children}
      <ErrorSnackbar error={contextError} setOpen={setOpen} open={open}/>
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
export { ErrorContext };
