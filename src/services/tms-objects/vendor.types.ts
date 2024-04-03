export interface IVendorDetailsResponse {
  value: IVendorDetails[] | [] ;
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

export interface IVendorDetails {
  vendor_id: number
  vendor_type_id: number
  vendor_type_name:string
  first_name: string
  last_name: string
  full_name:string
  email: string
  phone: string
  suite_number: string
  street_number: string
  address : string
  city: string
  state_id: number
  zipcode: string
  description: string
  company_name: string
  fid_ein: string
  mc_number: string
  active: boolean
}
export const initialStateVendor: IVendorDetails = {
  vendor_id : 0,
  vendor_type_id : 0,
  vendor_type_name : "",
  first_name : "",
  last_name : "",
  full_name : "",
  email : "",
  phone : "",
  suite_number : "",
  street_number : "",
  address: "",
  city : "",
  state_id : 0,
  zipcode : "",
  description : "",
  company_name : "",
  fid_ein : "",
  mc_number : "",
  active: true
};
export interface INewVendorDetails  {
  [x: string]: any;
  vendor_id: number
  vendor_type_id: number
  vendor_type_name:string
  first_name: string
  last_name: string
  email: string
  phone: string
  suite_number: string
  street_number: string
  city: string
  state_id: number
  zipcode: string
  description: string
  company_name: string
  fid_ein: string
  mc_number: string
  active: boolean
}

export type TVendorProps = {
  vendor_id?:number;
  handleSubmit?:(obj:IVendorDetails)=>void;
}

export interface  IVendorManagementProps  {
  
  selectedVendor: INewVendorDetails | null;
  VendorNewDetails: IVendorDetails;
  setVendorDetails : React.Dispatch<React.SetStateAction<IVendorDetails>>
  handleInputChange: (prop: keyof IVendorDetails) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveVendor: (event: { preventDefault: () => void }) => void;
  title: boolean;
 handleClose :(event: { preventDefault: () => void }) => void;
  
  setVendorNewDetails : React.Dispatch<React.SetStateAction<IVendorDetails>>;
  //handleFileUpload:(event: { preventDefault: () => void }) => void;
  // handleCheckBoxBroker: () => void;
  // handleCheckBoxShipper:() =>void;
  // handleDirectBillingRadio: () => void;
  // handleFactoringRadio: () => void;

}

export interface IVendorDocument {
  created_date:string;
  document_id : number;
  vendor_id : number;
  document_name : string;
  document_url : string;
  notes : string;
  file : File ;  
}

export const vendorDocumentInitialState : IVendorDocument = {
  created_date:"",
  document_id : 0,
  vendor_id : 0,
  document_name : "",
  document_url : "",
  notes : "",
  file : new File([], "")
}