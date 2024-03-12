export interface IUserRoleDetailsResponse {
    value: INewUserRoleDetails[] | [] ;
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
  
  export interface IUserRoleDetails {
    role_id : number;
    role_name :string;
    company_id : number;
    description: string;
    active: boolean;
    str_active:string;
   

  }
  
  export interface INewUserRoleDetails {
    role_id : number;
    role_name :string;
    company_id : number;
    description: string;
    active :boolean;
    str_active:string; 
  }
 
