import { createContext, useEffect, useState } from "react";
import { UserModel } from "../Models/auth.model";

interface AuthContextType {
  user: UserModel | null;
  accessToken: string | null;
  login: (user: UserModel, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: "",
  login() {},
  logout() {},
});

const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    if (user && accessToken) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }, [user, accessToken]);

  const login = (user: UserModel, token: string) => {
    setUser(user);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
