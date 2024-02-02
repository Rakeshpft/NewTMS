import React from "react";
import { RegProvider } from "./Auth/auth.contxt";
import { LoadProvider } from "./Load/load.context";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <RegProvider>
    <LoadProvider>{children}</LoadProvider>
  </RegProvider>
);
