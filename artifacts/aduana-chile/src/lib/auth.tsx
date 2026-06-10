import { createContext, useContext, useState } from "react";

export type UserRole = "viajero" | "aduana" | "pdi" | "sag";

export interface AuthUser {
  nombre: string;
  rol: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (nombre: string, rol: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("siga_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (nombre: string, rol: UserRole) => {
    const u: AuthUser = { nombre, rol };
    localStorage.setItem("siga_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("siga_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
