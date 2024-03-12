export interface IUserDetailsResponse {
  value: IUserDetails[] | [] ;
   exception?: Exception;
   is_error?: boolean;
   success?: boolean;
   message?: string;
}

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
export interface Data {}

export interface IUserDetails {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  contact_number: string;
  status: boolean;
  logged_in_user_id : number
  role_id: number
  staff_id : number;
  active: boolean;
  str_active:string;
}

export interface IInviteUserDetails  {
  [x: string]: any;
  staff_id : number;
  full_name: string;
  email: string;
  role_id: number;
  salutation_id: number;
  first_name: string;
  last_name: string;
  contact_number: string;

}

export interface IUserDetailsResponse {
  value: IUserDetails[] | [] ;
   exception?: Exception;
   is_error?: boolean;
   success?: boolean;
   message?: string;
}

export interface IUserRole {
  value: IUserRole[] | [] ;
   exception?: Exception;
   is_error?: boolean;
   success?: boolean;
   message?: string;
}
export interface IUserRole {
  role_id: number;
  role_name: string;
  company_id: number;
  description: string;
}



