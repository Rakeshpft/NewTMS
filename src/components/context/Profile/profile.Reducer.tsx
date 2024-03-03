import { useContext } from "react";
import { ProfileUpdateContext } from "./profileContext";
import { IProfilePassword } from "../../pofile/profileForm";
import { API } from "../../../services/API/api.services";
import { API_PROFILE } from "../../../services/API/api.constant";
import {  IProfileDetailsResponse } from "./profileTypes";
import { IProfileUpdate } from "../../pofile/profileType";

export const useProfileContext = () => {

  const { state, setState } = useContext(ProfileUpdateContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const profileResetPass  = async ( profilePassword : IProfilePassword ) => {
    setState((draft) => {
      draft.profileLoading = true ;  
    });

    const profilePassObject = {
      password : profilePassword.password
    }
    try {
      const profilePass = await API.post( API_PROFILE.postProfilePassword ,profilePassObject );
      return profilePass ;
    }catch (error: any) {
              console.log(error);
            }
            setState((draft) => {
              draft.profileLoading = false;
            });


  }

  const getProfileDetails = async ( ) => {
    setState(draft => {
      draft.profileLoading = true;
    });
    try {
      
      const profileDetails : IProfileDetailsResponse = await API.get(API_PROFILE.getProfile);
       return profileDetails ;
      // setState(draft => {
      //   draft.profileDetails = profileDetails;
      //   draft.profileLoading = false;
      // });
    }catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.profileLoading = false;
    });
   

  }

const postProfileDetails = async (profileDetails : IProfileUpdate ) => {
  setState(draft => {
    draft.profileLoading = true;
  })
  try {
    const updateProfileDetails = await API.post( API_PROFILE.postProfile, profileDetails);
    setState(draft => {
      draft.profileDetails = updateProfileDetails;     
      draft.profileLoading = false;
    })
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.profileLoading = false;
    });
  }
}
const postProfileImage = async ( file : File ) => {
  setState(draft => {
    draft.profileLoading = true;
  })
  const formData = new FormData();
  file && formData.append('file', file);
  
  try {
    const response = await API.postFormData(API_PROFILE.postProfileImage ,formData);
    response.value = response && response.value && response.value+'?id='+Math.random()
    return response;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.profileLoading = false;
    });
  }
}



  return {
    ...state,
    profileResetPass,
    getProfileDetails,
    postProfileDetails,
    postProfileImage
  }
};
