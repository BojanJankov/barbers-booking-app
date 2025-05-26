import { createContext, useEffect, useState } from "react";
import { UserModel } from "../Models/auth.model";
import { api } from "../services/api";

interface AuthContextType {
  user: UserModel | null;
  accessToken: string | null;
  login: (user: UserModel, token: string) => void;
  logout: () => void;
  getUserById: (userId: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: "",
  login() {},
  logout() {},
  async getUserById(userId: string) {},
});

const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
  }, []);

  // useEffect(() => {
  //   if (user && accessToken) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("accessToken", accessToken);
  //   } else {
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("user");
  //   }
  // }, [accessToken]);

  const getUserById = async (userId: string) => {
    try {
      const { data } = await api.get(`users/${userId}`);

      console.log("User od getUserById", data);

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      console.log("Uspesno setiran user na state", user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = (user: UserModel, token: string) => {
    console.log("Login called with:", user, token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    setUser(user);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.clear();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, getUserById }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
