import { useContext } from "react";
import { userAdminRoleContext } from "../context/userAdminRole.context";
import { IAPIResponse } from "../tms-objects/response.types";
import { API } from "../api-helper/api.services";
import { API_ADMIN_PERMISSIONS } from "../api-helper/api.constant";
import { IUserAdminRole } from "../tms-objects/userAdminRole.types";

export const useUserAdminRoleContext = () => {
  const { state, setState } = useContext(userAdminRoleContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getUserAdminRole = async (role_id: number) => {
    setState((draft) => {
      draft.userAdminRoleLoading = true;
    });
    try {
      const userAdminRoleData: IAPIResponse = await API.get(
        `${API_ADMIN_PERMISSIONS.getAdminRole}/${role_id}`
      );

      setState((draft) => {
        draft.userAdminRole = userAdminRoleData.value;
        draft.userAdminRoleLoading = false;
      });

      return userAdminRoleData;
    } catch (error: any) {}
  };
  const postUserAdminRole = async (payload: IUserAdminRole[]) => {
    setState((draft) => {
      draft.userAdminRoleLoading = true;
    });
    try {
      const userAdminRoleData: IAPIResponse = await API.post(API_ADMIN_PERMISSIONS.getAdminRole,payload);
      setState((draft) => {
        draft.apiResponse = userAdminRoleData;
        draft.userAdminRoleLoading = false;
      });

      return userAdminRoleData;
    } catch (error: any) {}
  };

  return {
    ...state,
    getUserAdminRole,
    postUserAdminRole
  };
};
