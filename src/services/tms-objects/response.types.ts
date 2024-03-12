export interface IAPIResponse {
    value: any;
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