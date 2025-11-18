import { createContext, useState } from "react";

interface User {
  id: number;
  username: string;
  type: number;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null); // null = não logado
  
    const login = (dadosDoUsuario: User) => {
      setUser(dadosDoUsuario);
    };
  
    const logout = () => {
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };