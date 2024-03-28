import { useContext } from "react";
import { UserUpdateContext } from "../context/user.context";
import { API } from "../api-helper/api.services";
import { API_USER } from "../api-helper/api.constant";
import { IUserDetails, IUserDetailsResponse } from "../tms-objects/user.types";
import { IAPIResponse } from "../tms-objects/response.types";
import { IUserFormState } from "../../components/user-page/user.types";

export const useUserContext = () => {
  const { state, setState } = useContext(UserUpdateContext);
  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getUserDetails = async () => {
    setState((draft) => {
      draft.userLoading = true;
    });
    try {
      const userList: IUserDetailsResponse = await API.get(API_USER.getUser);

      const newUserContacts = userList.value.map((user) => {
        user.full_name = `${user.first_name} ${user.last_name}`;
        user.str_active = user.active ? "Active" : "Inactive";
        return user;
      });

      setState((draft) => {
        draft.userDetails = newUserContacts;
      });
      return newUserContacts;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.userLoading = false;
      });
    }
  };

  const getIdividualUserDetails = async (userId: number) => { 
    setState((draft) => {
      draft.userLoading = true;
    });

    try {
      const response: IAPIResponse = await API.get(
        `${API_USER.getIndividualUser}/${userId}`
      );

      setState((draft) => {
        draft.selectedUser = response.value;
        draft.userLoading = false;
      });
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.userLoading = false;
      });
    }
  };

  const saveUser = async (newUser: IUserFormState) => {
    setState((draft) => {
      draft.userLoading = true;
    });
    clearSuccessAndFailure();
    try {
      const response: IAPIResponse = await API.post(
        API_USER.postNewUserData,
        newUser
      );

      setState((draft) => {
        draft.is_error = response.is_error ? true : false;
        draft.saveUserSuccess = response.success ? true : false;
        draft.selectedUser = null;
      });
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.saveUserFailed = true;
      });
    }
  };

  const deleteUserContact = async (userToDeleted: IUserDetails[]) => {
    setState((draft) => {
      draft.userLoading = true;
    });

    clearSuccessAndFailure();

    try {
      userToDeleted.forEach((user) => {
        API.del(`${API_USER.deleteUsers}/${user.staff_id}`); 
      });

      setTimeout(() => getUserDetails(), 200);
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.userLoading = false;
      });
    }
  };

  const clearSuccessAndFailure = () => {
    setState((draft) => {
      draft.saveUserFailed = false;
      draft.saveUserSuccess = false;
    });
  };

  const getUserRole = async () => {
    setState((draft) => {
      draft.userLoading = true;
    });
    try {
      const response: IAPIResponse = await API.get( `${API_USER.userRoleList}?status=1`);

      
      setState((draft) => {
        draft.userRole = response.value;
      });
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.userLoading = false;
      });
    }
  };
  return {
    ...state,
    getUserDetails,
    getIdividualUserDetails,
    saveUser,
    deleteUserContact,
    clearSuccessAndFailure,
    getUserRole,
  };
};
