export interface IProfileDetails {
  firtsName: string;
  lastName: string;
  phone: string;
}

export const initialProfileState = {
  firtsName: "",
  lastName: "",
  phone: "",
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