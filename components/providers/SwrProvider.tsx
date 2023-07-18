"use client";
import { SWRConfig } from "swr";
import ErrorSnackbar from "../ErrorSnackbar";

const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          return <ErrorSnackbar error={error} />;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
