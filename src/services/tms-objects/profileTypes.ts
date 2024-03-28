export interface IProfileDetailsResponse {
    value?: (IProfileDetails)[] | null;
    exception: Exception;
    is_error: boolean;
    success: boolean;
    message: string;
  }
//   export interface IProfileDetails {
//     email: string;
//     first_name: string;
//     last_name: string;
//     contact_number: string;
//     company_id: number;
//     logged_in_user_id: number;
//     image_url: string;
//     image_name?: null;
//   }
  export interface Exception {
    targetSite?: null;
    message: string;
    data: Data;
    innerException?: null;
    helpLink?: null;
    source?: null;
    hResult: number;
    stackTrace?: null;
  }
  export interface Data {
  }
  

export interface IProfileDetails {
    email: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    company_id: number;
    logged_in_user_id: number;
    image_url: string;
    image_name: string;
}

export const initialProfileState = {
    email: "",
    first_name: "",
    last_name: "",
    contact_number: "",
    company_id: 0,
    logged_in_user_id: 0,
    image_url: "",
    image_name: "",
};

export interface IProfileResetPassword {
  password: string;
//   company_guid: string;
//   logged_in_user_id: number;
}

export const initialProfileResetPassword = {
  password: "",
//   company_guid: "",
//   logged_in_user_id: 0,
}