import { SWRConfig } from "swr";
import AuthProvider from "./AuthProvider";
import ErrorSnackbar from "./ErrorSnackbar";
import SwrProvider from "./providers/SwrProvider";
import ErrorProvider from "./providers/ErrorProvider";

const fetcher = async (uri: string) => {
  const resp = await fetch(uri);
  if (resp.ok) {
    return await resp.json();
  }
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorProvider>
      <SwrProvider>
        <AuthProvider>{children}</AuthProvider>
      </SwrProvider>
    </ErrorProvider>
  );
};

export default Providers;
