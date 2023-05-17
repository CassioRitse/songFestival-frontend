import { api } from "@/services/api";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

type SignInData = {
  ra: string;
  password: string;
};
type User = {
  ra: string;
  name: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  //   useEffect(() => {
  //     const { token } = parseCookies();
  //     if(token){

  //     }
  //   }, []);

  async function singIn({ ra, password }: SignInData) {
    try {
      const { user, token, auth } = (await api.post("/login", { ra, password }))
        .data;

      if (auth == true) {
        setCookie(undefined, "token", token, {
          maxAge: 60 * 30 * 1, // half hour
        });
        api.defaults.headers["authorization"] = `Bearer ${token}`;
        setUser(user);

        Router.push(`/profile/${user.ra}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}
