export interface ICustomerDetailsResponse {
  value: ICustomerDetails[] | [];
  exception?: Exception;
  is_error?: boolean;
  success?: boolean;
  message?: string;
}
export interface ICustomerContactsResponse {
  value: ICustomerContacts[] | [];
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
export interface Data { }

export interface ICustomerDetails {
  customer_id: number;
  is_broker: boolean;
  is_shipper_receiver: boolean;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  suite_number: string;
  street: string;
  city: string;
  state_id: number;
  state_name :string;
  zipcode: string;
  address: string;
  description: string;
  company_name: string;
  fid_ein: string;
  mc_number: string;
  billing_type_id: number;
  billing_type_name : string;
  factor_id: number;
  quick_pay_fee: number;
  status_id: number;
  status_name: string;
  credit_id: number;
  credit_name : string;
  pay_terms: number;
  avg_days_to_pay: number;
  is_active: boolean;
}


export const initialStateCustomer: ICustomerDetails = {
  customer_id: 0,
  is_broker: true,
  is_shipper_receiver: false,
  full_name: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  suite_number: "",
  street: "",
  city: "",
  state_id: 1,
  state_name:"",
  zipcode: "",
  address: "",
  description: "",
  company_name: "",
  fid_ein: "",
  mc_number: "",
  billing_type_id: 1,
  billing_type_name:"",
  factor_id: 0,
  quick_pay_fee: 0,
  status_id: 1,
  status_name: "",
  credit_id: 1,
  credit_name:"",
  pay_terms: 0,
  avg_days_to_pay: 0,
  is_active: false,
};
export interface INewCustomerDetails {
  [x: string]: any;
  customer_id: number;
  is_broker: boolean;
  is_shipper_receiver: boolean;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  suite_number: string;
  street: string;
  city: string;
  state_id: number;
  state_name: string;
  state_short_name:string;
  zipcode: string;
  address: string;
  description: string;
  company_name: string;
  fid_ein: string;
  mc_number: string;
  billing_type_id: number;
  billing_type_name :string;
  factor_id: number;
  quick_pay_fee: number;
  status_id: number;
  status_name: string;
  credit_id: number;
  credit_name: string;
  pay_terms: number;
  avg_days_to_pay: number;
  is_active: boolean;
}

export interface ICustomerContacts {
  contact_id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  is_default: boolean;
  is_default_billing: boolean;
  customer_id: number;
  company_id: number;

}

export const initialCustomerContacts : ICustomerContacts ={
  contact_id: 0,
  name: "",
  email: "",
  phone: "",
  notes: "",
  is_default: false,
  is_default_billing: false,
  customer_id: 0,
  company_id: 0,
  
}

export interface INewCustomerContacts {
  [x: string]: any;
  contact_id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  is_default: boolean;
  is_default_billing: boolean;
  customer_id: number;
  company_id: number;
}
export type TCustomerProps = {
  customer_id?:number;
  handleSubmit?:(obj :ICustomerDetails)=>void;
}




 
  

export interface ICustomerStatusObject {
  customer_status_id: number;
  customer_status_name: string;
  is_active: boolean;
}

export const customerStatusInitialState : ICustomerStatusObject = {
  customer_status_id: 0,
  customer_status_name: "",
  is_active: false
}


export interface ICustomerDocument {
  created_date :string;
  document_id : number;
  customer_id : number;
  document_name : string;
  document_url :string;
  notes : string;
  file : File ;
  
  
  
}

export const CustomerDocumentInitialState : ICustomerDocument = {
  created_date:"",
  document_id : 0,
  customer_id : 0,
  document_name : "",
  document_url:"",
  notes : "",
  file : new File([], ""),
 
 
}

export interface ICustomerFilter  {
 is_broker: boolean;
 is_shipper_receiver: boolean;
}