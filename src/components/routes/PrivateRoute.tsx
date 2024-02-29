import React from "react";
import { Navigate } from "react-router-dom";
import { useRegContext } from "../context/Auth/auth.reducer";
import { routes } from "./routes";
import lscache from "lscache";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useRegContext();


  const authSession = !auth.access_token ? lscache.get("auth") : auth;
  console.log('authSession value is',authSession);
  
  const authenticated = authSession && authSession.authenticated !== null;
  return authenticated ? children : <Navigate to={routes.login} replace />;
};
