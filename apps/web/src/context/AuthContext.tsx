import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, UserResponse } from "@/lib/api";

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("kaizen_token"));
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const u = await api.getMe();
      setUser(u as UserResponse);
    } catch {
      localStorage.removeItem("kaizen_token");
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const result = await api.login({ email, password });
      if ((result as any).error) return { error: (result as any).error };
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
      if ((result as any).error) return { error: (result as any).error };
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

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
