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
  useEffect
} from "react";

type AuthContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
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
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  // console.log("user: ", user);

  const handleUpdateUser = async () => {
    if (NoAuthPath.includes(window.location.pathname)) return;
    if (user) return;

    // try {
    //   console.log("update user");
    //   const user = await getUserInfo();
    //   setUser({
    //     id: user.user.id,
    //     name: user.user.firstname_en + " " + user.user.lastname_en
    //   });
    // } catch (err) {
    //   if (err instanceof Error && err.message === AuthError.ERR_ACCESS_TOKEN) {
    //     // middleware handle this
    //   } else {
    //     console.log(err);
    //   }
    // }
  };

  useEffect(() => {
    handleUpdateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
