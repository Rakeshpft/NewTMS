import React, { createContext } from "react";
import { Draft } from "immer";
import { IUserAdminRole } from "../tms-objects/userAdminRole.types";
import { useImmer } from "use-immer";
import { IUserRole } from "../tms-objects/user.types";
import { IAPIResponse } from "../tms-objects/response.types";

export interface IUserAdminRoleData {
  userAdminRole: IUserAdminRole[] | null;
  userAdminRoleLoading: boolean;
  userRole: IUserRole[] | null;
  apiResponse:IAPIResponse|null;
}

const initialState: IUserAdminRoleData = {
  userAdminRoleLoading: false,
  userAdminRole: null,
  userRole: null,
  apiResponse:null
};

type UserAdminRoleContextType = {
  state: IUserAdminRoleData;
  setState: (
    f: (draft: Draft<IUserAdminRoleData>) => void | IUserAdminRoleData) => void;
};

const userAdminRoleContext = createContext<UserAdminRoleContextType>({
  state: initialState,
  setState: () => undefined,
});

const UserAdminRoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<IUserAdminRoleData>(initialState);

  return (
    <userAdminRoleContext.Provider value={{ state, setState }}>
      {children}
    </userAdminRoleContext.Provider>
  );
};

export { userAdminRoleContext, UserAdminRoleProvider, initialState };
