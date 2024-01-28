import { User } from "@/types/type";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
