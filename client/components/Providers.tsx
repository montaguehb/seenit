import AuthProvider from "./AuthProvider";

const fetcher = async (uri: string) => {
  const resp = await fetch(uri);
  if (resp.ok) {
    return await resp.json();
  }
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
