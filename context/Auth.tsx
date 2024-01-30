"use client";

import { getUserInfo } from "@/action/mcv";
import { AuthError } from "@/constants/error";
import { useLocalStorage } from "@/hooks/LocalStorage";
import { User } from "@/types/type";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

type AuthContextProps = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  setUser: () => {}
});

export const useAuth = () => {
  if (!AuthContext) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return useContext(AuthContext);
};

export const NoAuthPath = ["/th/auth", "/en/auth"];

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | undefined>("user", undefined);

  const handleUpdateUser = async () => {
    if (NoAuthPath.includes(window.location.pathname)) return;
    if (user) return;

    try {
      console.log("update user");
      const user = await getUserInfo();
      setUser({
        id: user.user.id,
        name: user.user.firstname_en + " " + user.user.lastname_en
      });
    } catch (err) {
      if (err instanceof Error && err.message === AuthError.ERR_ACCESS_TOKEN) {
        // middleware handle this
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleUpdateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
