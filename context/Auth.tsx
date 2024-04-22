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

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleUpdateUser = async () => {
    if (NoAuthPath.includes(window.location.pathname)) return;
    // const stored = localStorage.getItem("user");
    // if (stored) {
    //   setUser(JSON.parse(stored) ? JSON.parse(stored) : null);
    //   return;
    // }

    try {
      if (user === null) {
        try {
          const user = await getUserInfo();
          const fullName = user.user.firstname_th;

          setUser({
            id: user.user.id,
            name: fullName
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.user.id,
              name: fullName
            })
          );
        } catch (e) {
          console.log(e);
        }
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
