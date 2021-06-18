import React, { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";

interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface IAuth {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [data, setData] = useState<IAuth>({} as IAuth);

  const signIn = async ({ email, password }: ISignInCredentials) => {
    const response = await api.post("/sessions", { email, password });

    const { token, user }  = response.data

    api.defaults.headers.autorization = `Bearer ${token}`

    setData({token, user})
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
