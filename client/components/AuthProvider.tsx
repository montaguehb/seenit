"use client";

import { createContext, useEffect, useState } from "react";
import { UserContextType } from "@/lib/types";
import useSWR from "swr";

const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
});

const getCookie = (name: string) => {
  const cookie = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return cookie ? cookie[2] : "";
};

const fetcher = async (uri: string) => {
  const resp = await fetch(uri, {
    method: "GET",
    headers: {
      "X-CSRF-TOKEN": getCookie("csrf_access_token"),
    },
  });
  if (resp.ok) {
    return await resp.json();
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const { data, isLoading, error } = useSWR("/api/v1/me", fetcher);

  const updateUser = (user: any) => {
    setUser(user);
  };

  useEffect(() => {
    if (data) {
      updateUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
export { UserContext };
