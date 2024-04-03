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
  street_number: string;
  city: string;
  state_id: number;
  zipcode: string;
  address: string;
  description: string;
  company_name: string;
  fid_ein: string;
  mc_number: string;
  billing_type_id: number;
  factor_id: number;
  quick_pay_fee: string;
  status_id: number;
  customer_status_name: string;
  credit_id: number;
  pay_terms: string;
  avg_days_to_pay?: any;
  active: boolean;


}


export const initialStateCustomer: ICustomerDetails = {
  customer_id: 0,
  is_broker: false,
  is_shipper_receiver: false,
  full_name: "",
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
  customer_status_name: "",
  credit_id: 0,
  pay_terms: "",
  avg_days_to_pay: undefined,
  active: false,

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
  street_number: string;
  city: string;
  state_id: number;
  state_name: string;
  zipcode: string;
  address: string;
  description: string;
  company_name: string;
  fid_ein: string;
  mc_number: string;
  billing_type_id: number;
  factor_id: number;
  quick_pay_fee: string;
  status_id: number;
  customer_status_name: string;
  credit_id: number;
  pay_terms: string;
  avg_days_to_pay?: any;
  active: boolean;
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

export interface ICustomerManagementProps {


  selectedCustomer: INewCustomerDetails | null;

  customerNewDetails: ICustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<ICustomerDetails>>;
  handleInputChange: (prop: keyof ICustomerDetails) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveCustomer: (event: { preventDefault: () => void }) => void;
  title: boolean;
  setcustomerNewDetails: React.Dispatch<React.SetStateAction<ICustomerDetails>>;
 
  
 
 

  handleClose: (event: { preventDefault: () => void }) => void;



  handleCheckBoxBroker: () => void;
  handleCheckBoxShipper: () => void;
  handleDirectBillingRadio: () => void;
  handleFactoringRadio: () => void
}



// export interface  ICustomerManagementPropsDocuments {

 




//   handleFileUpload: (event: { preventDefault: () => void }) => void;

// }

// export interface  ICustomerManagementPropsContacts {

//   handleSaveContact: (event: { preventDefault: () => void }) => void;

// }

export interface ICustomerContactsProps {
    modalOpen: boolean;
    closeModal: () => void;
    selectedContact : INewCustomerContacts | null;
    contactNewDetails : ICustomerContacts;
    setContactDetails :React.Dispatch<React.SetStateAction<ICustomerContacts>>
    setcontactNewDetails :React.Dispatch<React.SetStateAction<ICustomerContacts>>
    handleSaveContact: (event: { preventDefault: () => void }) => void;
    handleInputContactChange: (prop: keyof ICustomerContacts) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: Boolean;
    handleDirectCheckBox:() => void;
    handleDirectBillingCheckBox:() => void;
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
