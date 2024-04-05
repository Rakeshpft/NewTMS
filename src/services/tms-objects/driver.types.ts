
import { ITrailerObject } from "./trailer.types";
import { ITruckObject } from "./truck.types";
import { IVendorDetails } from "./vendor.types";
export interface IDriverObject {
  driver_id: number;
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  contact_number: string;
  state_id: number;
  city: string;
  zipcode: string;
  fuel_card: string;
  create_new_factor: string;
  full_name: string;
  pay_to_id: number;
  codriver_name: string;
  truck_id: number;
  trailer_id: number;
  is_IFTA_handled_by_company: boolean;
  status_id: boolean;
  note: string;
  driver_images: string;
  suite_number: string;
  street_number: string;
  driver_type_id: number;
  driver_status_id: number;
  vendor_id: number;
  active: boolean;
  str_active: string;

}

export const initialStateDriver = {
  driver_id: 0,
  first_name: "",
  last_name: "",
  dob: "",
  phone: "",
  contact_number: "",
  email: "",
  address_line1: "",
  address_line2: "",
  state_id: 0,
  city: "",
  zipcode: "",
  fuel_card: "",
  create_new_factor: "",
  full_name: "",
  pay_to_id: 0,
  codriver_name: "",
  truck_id: 0,
  trailer_id: 0,
  vendor_id: 0,
  is_IFTA_handled_by_company: false,
  status_id: false,
  note: "",
  driver_images: "",
  suite_number: "",
  street_number: "",
  driver_type_id: 0,
  driver_status_id: 0,
  active: false,
  str_active: "",
  
 
};

export interface IDriverType {
  driver_type_id: number;
  driver_type_name: string;
  is_active: boolean;
}
export const driverTypeInitialState : IDriverType = {
  driver_type_id:0,
  driver_type_name:"",
  is_active:false,
}

export interface IDriverStatus {
  driver_status_id: number;
  driver_status_name: string;
  is_active: boolean;
}
export const driverStatusInitialState : IDriverStatus = {
  driver_status_id:0,
  driver_status_name:"",
  is_active:false,
}

export interface IDriverPayRatesOject {
  driver_id: number;
  driver_pay_rate_id: number;
  pay_rate_type_id: number;
  per_mile: number;
  per_extra_stop: number;
  per_empty_mile: number;
  amount: number;
  period: number;
  starting_on: string;
  per_hour: number;
  active: boolean;
}

export const initialStatedriver_pay_rates = {
  driver_id: 0,
  driver_pay_rate_id: 0,
  pay_rate_type_id: 0,
  per_mile: 0,
  per_extra_stop: 0,
  per_empty_mile: 0,
  amount: 0,
  period: 0,
  starting_on: "",
  per_hour: 0,
  active: false
}

export interface IDriverDocApp {
  driver_id : number,
  hire_date : string,
  status_id : boolean,
  company_id : number,
  status_name : string,
  application_id : number,
  application_date : string,
  termination_date : string,
  attachment : string,
  file  : File
}

export const  initialDriverDocApp = {
  driver_id : 0,
  hire_date : "",
  status_id : false,
  company_id : 0,
  status_name : "",
  application_id : 0,
  application_date : "",
  termination_date : "",
  attachment : "",
  file  : ""
}

export type TDriverProps = {
  driver_id?:number;
  handleSubmit?:(obj :IDriverObject)=>void;
}


export interface IDriverDoc {
  application_id : number,
  status_id : number,
  status_name : string,
  application_date : string,
  hire_date : string,
  termination_date : string,
  attachment : string,
  driver_id : number
  company_id : number
  file  : File
}

export const initialDriverDoc : IDriverDoc = {
  application_id : 0,
  status_id : 0,
  status_name : "",
  application_date : "",
  hire_date : "",
  termination_date : "",
  attachment : "",
  driver_id : 0,
  company_id : 0,
  file : new File([], ""),

  
}

export interface IDriverCdl {
  driver_id : number,
  company_id : number,
  cdl_number : string,
  cdl_id : number,
  issue_date : string, 
  exp_date : string,
  attachment : string,
  file  : File,
  state_id : number,
  state_name:string
}
export const initialDriverCdl : IDriverCdl = {
  driver_id : 0,
  company_id : 0,
  cdl_number : "",
  cdl_id : 0,
  issue_date : "",
  exp_date : "",
  attachment : "",
  file : new File([], ""),
  state_id : 0,
  state_name:""
}

export interface IDriverMedical {
  driver_id : number,
  company_id : number,
  card_id : number,
  card_number : string,
  issue_date : string, 
  exp_date : string,
  attachment : string,
  file  : File
}
export const initialDriverMedical : IDriverMedical = {
  driver_id : 0,
  company_id : 0,
  card_id : 0,
  card_number : "",
  issue_date : "",
  exp_date : "",
  attachment : "",
  file : new File([], "")
  
}

export interface IDriverDrugTest {
  driver_id : number,
  company_id : number,
  status_id : number,
  drug_test_id : number,
  status_name : string,
  note :string,
  attachment : string,
  date : string,
  file  : File
}

export const initialDriverDrugTest : IDriverDrugTest = {
  driver_id : 0,
  company_id : 0,
  status_id : 0,
  drug_test_id : 0,
  status_name : "",
  note : "",
  attachment : "",
  date : "",
  file : new File([], "")
}

export interface IDriverMvr {
  
  driver_id : number,
  company_id : number, 
  mvr_id : number,
  note :string,
  attachment : string,
  date : string,
  file  : File
}

export const initialDriverMvr : IDriverMvr = {
  
  driver_id : 0,
  company_id : 0,
  mvr_id : 0,
  note : "",
  attachment : "",
  date : "",
  file : new File([], "")
}

export interface IDriverSSn {
  driver_id : number,
  company_id : number, 
  ssn_id : number,
  ss_number : string,
  attachment : string,
  file  : File
}

export const initialDriverSsn : IDriverSSn = {
  driver_id : 0,
  company_id : 0,
  ssn_id : 0,
  ss_number : "",
  attachment : "",
  file : new File([], "")
}

export interface IDriverEmpVerify {
  driver_id : number,
  company_id : number, 
  status_id : number,
  verification_id : number,
  date : string,
  note :string,
  attachment : string,
  file  : File
  status_name : string
}

export const initialDriverEmpVerify : IDriverEmpVerify = {
  driver_id : 0,
  company_id : 0,
  status_id : 0,
  status_name : "",
  verification_id : 0,
  date : "",
  note : "",
  attachment : "",
  file : new File([], "")
}

export interface IDriverOther {
  doc_id  : number,
  name : string,
  expiry_date : string,
  notes : string,
  attachment : string,
  file  : File,
  driver_id : number,
  company_id  : number
}

export const initialDriverOther : IDriverOther = {
  doc_id  : 0,
  name : "",
  expiry_date : "",
  notes : "",
  attachment : "",
  file : new File([], ""),
  driver_id : 0,
  company_id  : 0
}

export interface IDriverSchedulePayee{
  categgory : string,
  amount : number,
  schedule : string,
  last : string,
  schedule_id : number

}

export const initialDriverSchedule : IDriverSchedulePayee = {
  categgory : "",
  amount : 0,
  schedule : "",
  last : "",
  schedule_id : 0
}

export interface IDriverManagenetProps {
  newDriver: IDriverObject;
  handleInputChange: (prop: keyof IDriverObject) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseForm: () => void;
  driverType: IDriverType[] | null;
  driverStatus: IDriverStatus[] | null;
  handleCheckboxChange: () => void;
  SaveDriverIndividual: (event: { preventDefault: () => void }) => void;
  vendorList: IVendorDetails[] | null;
  truckListStatus: ITruckObject[] | null;
  trailerListStatus : ITrailerObject[] | null;
  driverPayRates : IDriverPayRatesOject
  handleInputDriverPayRates: (prop: keyof IDriverPayRatesOject) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange : (event: React.ChangeEvent<HTMLInputElement>) => void
}
