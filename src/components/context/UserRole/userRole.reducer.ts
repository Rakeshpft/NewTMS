import { useContext } from "react";
import { UserRoleUpdateContext } from "./userRole.context";
import { API } from "../../../services/api-helper/api.services";
import { API_USER_Role } from "../../../services/api-helper/api.constant";
import {  IUserRoleDetails, IUserRoleDetailsResponse } from "./userRole.types";
import { IAPIResponse } from "../../../services/tms-objects/response.types";

import { IUserRoleFormState } from "../../user-role/userRole.types";

export const useUserRoleContext = () => {
  const { state, setState } = useContext(UserRoleUpdateContext);
  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getUserRoleDetails = async () => {
    setState((draft) => {
      draft.userRoleLoading = true;
    });
    try {
      const userRoleList :IUserRoleDetailsResponse = await API.get(API_USER_Role.getUserRole);
          
      const newUserContacts = userRoleList.value.map((user) => {
        user.str_active = user.active ? "Active" : "Inactive";
        return user;
      });
  
      setState((draft) => {
        draft.userRoleDetails = newUserContacts;
      });
  
      return newUserContacts;
        

    
    
     
      // setState((draft) => {
      //   draft.userRoleDetails   = userRoleList;
      // });
      
    } 
    
    catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.userRoleLoading = false;
    });
  };



  const getIndividualUserRoleDetails = async (RoleId: number) => {
    setState((draft) => {
      draft.userRoleLoading = true;
    })

    try {
      const response : IAPIResponse = await API.get(`${API_USER_Role.getIndividualUserRole}/${RoleId}`); 

      console.log("id data" , response )
     
      setState ((draft) => {
        draft.slectedUserRole = response.value
        draft.userRoleLoading = false
      })

     
    }catch (error: any) {
      console.log(error)
      setState((draft) => {
        draft.userRoleLoading = false
      })
    }
  };

  const saveUserRole = async ( newUserRole : IUserRoleFormState ) => {
    setState((draft) => {
      draft.userRoleLoading = true;
    })
    clearSuccessAndFailure();
    try{
      const response : IAPIResponse = await API.post(API_USER_Role.postNewUserRoleData, newUserRole);
      
      console.log("post id data " ,response )
       setState(draft => {
        draft.is_error = response.is_error ? true : false
          draft.saveUserRoleSuccess = response.success ? true : false
      
       
        draft.slectedUserRole = null;
      });

    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.saveUserRoleFailed = true
      })
    }
  }

  const deleteUserRole = async (userToDeleted : IUserRoleDetails[]) => {
    setState((draft) => {
      draft.userRoleLoading = true;
    });
    clearSuccessAndFailure();
    try{
      await userToDeleted.forEach(user => {

        API.del(`${API_USER_Role.deleteUsersRole}/${user.role_id}`);
      })
      
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.userRoleLoading = false
      })
    }
    
  }

  const clearSuccessAndFailure = () => {
    setState((draft) => {
      draft.saveUserRoleFailed = false;
      draft.saveUserRoleSuccess = false;

    });
  };
  return {
    ...state,
    getUserRoleDetails,
    getIndividualUserRoleDetails,
    saveUserRole,
    deleteUserRole,
    clearSuccessAndFailure
  };
};
