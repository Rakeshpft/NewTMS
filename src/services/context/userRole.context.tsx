import React, { createContext }   from "react";
import { Draft } from "immer";
import {IUserRoleDetails } from "../tms-objects/userRole.types";
import { useImmer } from "use-immer";


export interface IUserRoleData {
   userRoleDetails : IUserRoleDetails[] | null 
   userRoleLoading : boolean;
   is_error : boolean;
   saveUserRoleSuccess : boolean;
   saveUserRoleFailed : boolean;
   selectedUserRole : IUserRoleDetails | null

}

const InitialState : IUserRoleData = {
    userRoleDetails : null,
    is_error : false,
    userRoleLoading : false,
    saveUserRoleSuccess : false,
    saveUserRoleFailed : false,
    selectedUserRole : null
}

type UserRoleUpdateContextType = {
    state : IUserRoleData;
    setState : (
        f : (draft : Draft<IUserRoleData>) => void | IUserRoleData
    ) => void;
};
 
const UserRoleUpdateContext = createContext<UserRoleUpdateContextType>({
    state : InitialState,
    setState : () => undefined
})

const UserRoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<IUserRoleData>(InitialState);
    return (
        <UserRoleUpdateContext.Provider value={{ state, setState }}>
            {children}
        </UserRoleUpdateContext.Provider>
    );
};

export { UserRoleUpdateContext, UserRoleProvider , InitialState }