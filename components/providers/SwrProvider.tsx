"use client";
import { SWRConfig } from "swr";
import ErrorSnackbar from "../ErrorSnackbar";

const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig>
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
