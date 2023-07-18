import { SWRConfig } from "swr";
import AuthProvider from "./AuthProvider";
import ErrorSnackbar from "./ErrorSnackbar";
import SwrProvider from "./providers/SwrProvider";

const fetcher = async (uri: string) => {
  const resp = await fetch(uri);
  if (resp.ok) {
    return await resp.json();
  }
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SwrProvider>
      <AuthProvider>{children}</AuthProvider>
    </SwrProvider>
  );
};

export default Providers;
