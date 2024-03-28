export interface ICustomerDetailsResponse {
  value: ICustomerDetails[] | [] ;
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

export interface ICustomerDetails {
  customer_id: number;
  is_broker: boolean;
  is_shipper_receiver: boolean;
  first_name: string;
  last_name: string;
  full_name:string;
  email: string;
  phone: string;
  suite_number: string;
  street_number: string;
  city: string;
  state_id: number;
  
  zipcode: string;
  address : string;
  description: string;
  company_name: string;
  fid_ein: string;
  mc_number: string;
  billing_type_id:  number;
  factor_id: number;
  quick_pay_fee: string;
  status_id: number;
  customer_status_name:string;

  credit_id: number;
  pay_terms: string;
  avg_days_to_pay?: any;
  active: boolean;

}


export const initialStateCustomer: ICustomerDetails = {
  customer_id: 0,
  is_broker: false,
  is_shipper_receiver: false,
  full_name:"",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  suite_number: "",
  street_number: "",
  city: "",
  state_id: 0,
  
  zipcode: "",
  address: "",
  description: "",
  company_name: "",
  fid_ein: "",
  mc_number: "",
  billing_type_id: 0,
  factor_id: 0,
  quick_pay_fee: "",
  status_id: 0,
  customer_status_name:"",
  credit_id: 0,
  pay_terms: "",
  avg_days_to_pay: undefined,
  active: false,
  
  
};
export interface INewCustomerDetails  {
  [x: string]: any;
  customer_id: number;
  is_broker: boolean;
  is_shipper_receiver: boolean;
  first_name: string;
  last_name: string;
  full_name:string;
  email: string;
  phone: string;
  suite_number: string;
  street_number: string;
  city: string;
  state_id: number;
  state_name : string;
  zipcode: string;
  address : string;
  description: string;
  company_name: string;
  fid_ein: string;
  mc_number: string;
  billing_type_id: number;
  factor_id: number;
  quick_pay_fee: string;
  status_id: number;
  customer_status_name:string;
  credit_id: number;
  pay_terms: string;
  avg_days_to_pay?: any;
  active: boolean;
 

}
export interface  ICustomerManagementProps  {
  
  selectedCustomer: INewCustomerDetails | null;
  CustomerNewDetails: ICustomerDetails;
  setCustomerDetails : React.Dispatch<React.SetStateAction<ICustomerDetails>>
  handleInputChange: (prop: keyof ICustomerDetails) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveCustomer: (event: { preventDefault: () => void }) => void;
  title: boolean;
 handleClose :(event: { preventDefault: () => void }) => void;
  
  setcustomerNewDetails : React.Dispatch<React.SetStateAction<ICustomerDetails>>;
  // handleFileUpload:(event: { preventDefault: () => void }) => void;\
  handleCheckBoxBroker: () => void;
  handleCheckBoxShipper:() =>void;
  handleDirectBillingRadio: () => void;
  handleFactoringRadio: () => void;

 

 
  
}