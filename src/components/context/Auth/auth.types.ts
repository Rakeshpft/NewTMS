export interface IAuthObject {
  user_name: string;
  password: string;
  commpany_name: string;
  company_id: number;
  company_uuid: string;
  access_token: string;
  logged_in_user_id: number;
}

export interface IRegistration {
  company_name: string;
  mc_number: string;
  email: string;
  mobile: string;
  website: string;
  first_name: string;
  last_name: string;
  salutation_id: number;
}

export const initialRegistrationState = {
  company_name: "",
  mc_number: "",
  email: "",
  mobile: "",
  website: "",
  first_name: "",
  last_name: "",
  salutation_id: 0,
};

export const authInitialState = {
  user_name: "",
  password: "",
  access_token: "",
  commpany_name: "",
  company_id: 0,
  company_uuid: "",
  logged_in_user_id: 0, 


};

export const salutationOptions = [
  { salutation_id: 1, salutation_name: "Mr." },
  { salutation_id: 2, salutation_name: "Mrs." },
  { salutation_id: 3, salutation_name: "Ms." },
  { salutation_id: 4, salutation_name: "Dr." },
];
