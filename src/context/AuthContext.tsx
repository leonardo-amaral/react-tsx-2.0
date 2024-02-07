import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Login from "../pages/login";
import { TUserJwt } from "../types/user.types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: TUserJwt | null;
  setUser: (data: TUserJwt | null) => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<TUserJwt | null>(null);
  const [userToken, _] = useLocalStorage({
    keyName: "@fbc:token",
    defaultValue: null,
  });

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    if (userToken && userToken !== "null") {
      try {
        const decodedData = jwtDecode(userToken) as TUserJwt;
        console.log(decodedData);
        setUser(decodedData);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    setLoading(false);
  }, [userToken]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
