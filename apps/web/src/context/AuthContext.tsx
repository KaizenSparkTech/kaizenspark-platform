import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, UserResponse } from "@/lib/api";

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("kaizen_token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.getMe()
        .then((u) => setUser(u))
        .catch(() => {
          localStorage.removeItem("kaizen_token");
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const result = await api.login({ email, password });
      if (result.error) return { error: result.error };
      localStorage.setItem("kaizen_token", result.access_token);
      setToken(result.access_token);
      setUser(result.user);
      return {};
    } catch (e: any) {
      return { error: e.message || "Login failed" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await api.register({ name, email, password });
      if (result.error) return { error: result.error };
      localStorage.setItem("kaizen_token", result.access_token);
      setToken(result.access_token);
      setUser(result.user);
      return {};
    } catch (e: any) {
      return { error: e.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("kaizen_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
