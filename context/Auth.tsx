"use client";

import { getUserInfo } from "@/action/mcv";
import { AuthError } from "@/constants/error";
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
const userKey = "user";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const handleUpdateUser = async () => {
    if (NoAuthPath.includes(window.location.pathname)) return;
    const stored = localStorage.getItem(userKey);
    if (stored) {
      setUser(JSON.parse(stored) ? JSON.parse(stored) : null);
      return;
    }

    try {
      if (user === null) {
        console.log("update user");
        const user = await getUserInfo();
        setUser({
          id: user.user.id,
          name: user.user.firstname_en + " " + user.user.lastname_en
        });
        localStorage.setItem(
          userKey,
          JSON.stringify({
            id: user.user.id,
            name: user.user.firstname_en + " " + user.user.lastname_en
          })
        );
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
