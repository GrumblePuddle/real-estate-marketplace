import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { User } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO:
    // Lyssna på Firebase Authentication
    // Uppdatera user när auth-status ändras
    // Sätt loading till false när första svaret kommer
    // Avsluta lyssnaren när komponenten avmonteras
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth måste användas inom AuthProvider");
  }

  return context;
};
