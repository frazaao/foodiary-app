import { createContext } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  return (
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      {children}
    </AuthContext.Provider>
  );
};
