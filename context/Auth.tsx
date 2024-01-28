"use client";

import { checkAccessToken, getUserInfo } from "@/action/mcv";
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

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    checkAccessToken();
    getUserInfo().then((u) => {
      setUser({
        id: u.user.id,
        name: u.user.firstname_en + " " + u.user.lastname_en
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
