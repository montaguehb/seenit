import Nav from "@/components/Nav";
import "../styles/global.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { createContext, useState } from "react";

const fetcher = async (uri: string) => {
  const resp = await fetch(uri);
  if (resp.ok) {
    return await resp.json();
  }
};

interface UserContextType {
  id?: string;
  username?: string;
  role?: string;
  created_at?: string;
  comment?: string;
  user_community?: string;
  user_post?: string;
  post?: string;
  email?: string;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserContextType | null>(null);

  const updateUser = (updatedUser: UserContextType) => {
    setUser(updatedUser);
  };
  const value = {user, updateUser}
  const UserContext = createContext({user: user, updateUser: updateUser});
  
  return (
    <main>
      <UserContext.Provider value={value}>
        <SWRConfig value={{ fetcher: fetcher }}>
          <Nav />
          <Component {...pageProps} />
        </SWRConfig>
      </UserContext.Provider>
    </main>
  );
}
