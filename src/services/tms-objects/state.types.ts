export interface IStateDetailsResponse {
    value: IStateDetails[] | [] ;
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

export interface IStateDetails {
    state_id: number;
    country_id: number;
    state_name: string;
    state_short_name: string;
    state_code: string;
  }
  export const initialState :IStateDetails = {
    state_id: 0,
    country_id: 0,
    state_name: "",
    state_short_name: "",
    state_code: "",
  }
  export interface INewStateDetails {
    [x: string]: any;
    state_id: number;
    country_id: number;
    state_name: string;
    state_short_name: string;
    state_code: string;
  }