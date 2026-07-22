import { createContext, useContext, useState } from "react";
import * as userService from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("vayre_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const persist = (data) => {
    localStorage.setItem("vayre_user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const data = await userService.login(email, password);
    persist(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await userService.register(name, email, password);
    persist(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("vayre_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
