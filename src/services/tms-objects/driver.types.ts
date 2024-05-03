import { ITrailerObject } from "./trailer.types";
import { ITruckObject } from "./truck.types";
import { IVendorDetails } from "./vendor.types";
export interface IDriverObject {
  driver_id: number;
  driver_name: string;
  login_id?: number;
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  contact_number: string;
  suite_number: string;
  street_number: string;
  application_date: string;
  hire_date: string;
  state_id: number;
  zipcode: string;
  driver_type_id: number;
  driver_type_name?: string;
  vendor_id: number;
  vendor_name?: string;
  is_IFTA_handled_by_company: boolean;
  driver_status_id: number;
  driver_status_name?: string;
  truck_id: number;
  trailer_id: number;
  fuel_card_id: number;
  fuel_card_number: string;
  fuel_card_expiration_date: string;
  active: boolean;
  truck_name?: string;
  trailer_name?: string;
  driver_images?: string;
  file: File | null;
}

export const initialStateDriver: IDriverObject = {
  driver_id: 0,
  first_name: "",
  last_name: "",
  dob: "",
  contact_number: "",
  email: "",
  state_id: 0,
  zipcode: "",
  truck_id: 0,
  application_date: "",
  hire_date: "",
  trailer_id: 0,
  vendor_id: 0,
  is_IFTA_handled_by_company: false,
  driver_images: "",
  suite_number: "",
  street_number: "",
  driver_type_id: 0,
  driver_status_id: 0,
  active: false,
  driver_name: "",
  login_id: 0,
  driver_type_name: "",
  vendor_name: "",
  driver_status_name: "",
  fuel_card_id: 0,
  fuel_card_number: "",
  trailer_name: "",
  truck_name: "",
  fuel_card_expiration_date: "",
  file: null,
};

export interface IDriverType {
  driver_type_id: number;
  driver_type_name: string;
  is_active: boolean;
}
export const driverTypeInitialState: IDriverType = {
  driver_type_id: 0,
  driver_type_name: "",
  is_active: false,
};

export interface IDriverStatus {
  driver_status_id: number;
  driver_status_name: string;
  is_active: boolean;
}
export const driverStatusInitialState: IDriverStatus = {
  driver_status_id: 0,
  driver_status_name: "",
  is_active: false,
};

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
  freight_percentage: number;
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
  freight_percentage: 0,
  per_hour: 0,
  active: false,
};

export interface IDriverDocApp {
  driver_id: number;
  hire_date: string;
  status_id: boolean;
  company_id: number;
  status_name: string;
  application_id: number;
  application_date: string;
  termination_date: string;
  attachment: string;
  file: File;
}

export const initialDriverDocApp = {
  driver_id: 0,
  hire_date: "",
  status_id: false,
  company_id: 0,
  status_name: "",
  application_id: 0,
  application_date: "",
  termination_date: "",
  attachment: "",
  file: "",
};

export type TDriverProps = {
  driver_id?: number;
  handleSubmit?: (obj: IDriverObject) => void;
};

export interface IDriverDoc {
  application_id: number;
  status_id: number;
  status_name?: string;
  application_date: string;
  hire_date: string;
  termination_date: string;
  attachment?: string;
  driver_id?: number;
  company_id?: number;
  attachment_url?: string;
  file: File;
}

export const initialDriverDoc: IDriverDoc = {
  application_id: 0,
  status_id: 0,
  status_name: "",
  application_date: "",
  hire_date: "",
  termination_date: "",
  attachment: "",
  driver_id: 0,
  company_id: 0,
  attachment_url: "",
  file: new File([], ""),
};

export interface IDriverCdl {
  driver_id: number;
  company_id: number;
  cdl_number: string;
  cdl_id: number;
  issue_date: string;
  exp_date: string;
  attachment: string;
  attachment_url: string;
  file: File;
  state_id: number;
  state_name: string;
}
export const initialDriverCdl: IDriverCdl = {
  driver_id: 0,
  company_id: 0,
  cdl_number: "",
  cdl_id: 0,
  issue_date: "",
  exp_date: "",
  attachment: "",
  attachment_url: "",
  file: new File([], ""),
  state_id: 0,
  state_name: "",
};

export interface IDriverMedical {
  driver_id: number;
  company_id: number;
  card_id: number;
  card_number: string;
  issue_date: string;
  exp_date: string;
  attachment_url: string;
  attachment: string;
  file: File;
}
export const initialDriverMedical: IDriverMedical = {
  driver_id: 0,
  company_id: 0,
  card_id: 0,
  card_number: "",
  issue_date: "",
  exp_date: "",
  attachment_url: "",
  attachment: "",
  file: new File([], ""),
};

export interface IDriverDrugTest {
  driver_id?: number;
  company_id?: number;
  status_id: number;
  drug_test_id: number;
  status_name?: string;
  note: string;
  attachment_url?: string;
  attachment: string;
  date: string;
  file: File;
}

export const initialDriverDrugTest: IDriverDrugTest = {
  driver_id: 0,
  company_id: 0,
  status_id: 0,
  drug_test_id: 0,
  status_name: "",
  note: "",
  attachment_url: "",
  attachment: "",
  date: "",
  file: new File([], ""),
};

export interface IDriverMvr {
  driver_id: number;
  company_id: number;
  mvr_id: number;
  note: string;
  attachment: string;
  attachment_url: string;
  date: string;
  file: File;
}

export const initialDriverMvr: IDriverMvr = {
  driver_id: 0,
  company_id: 0,
  mvr_id: 0,
  note: "",
  attachment: "",
  attachment_url: "",
  date: "",
  file: new File([], ""),
};

export interface IDriverSSn {
  driver_id: number;
  company_id: number;
  ssn_id: number;
  ss_number: string;
  attachment: string;
  attachment_url: string;
  file: File;
}

export const initialDriverSsn: IDriverSSn = {
  driver_id: 0,
  company_id: 0,
  ssn_id: 0,
  ss_number: "",
  attachment_url: "",
  attachment: "",
  file: new File([], ""),
};

export interface IDriverEmpVerify {
  driver_id?: number;
  company_id?: number;
  status_id: number;
  verification_id: number;
  date: string;
  note: string;
  attachment: string;
  attachment_url?: string;
  file: File;
  status_name?: string;
}

export const initialDriverEmpVerify: IDriverEmpVerify = {
  driver_id: 0,
  company_id: 0,
  status_id: 0,
  status_name: "",
  verification_id: 0,
  date: "",
  note: "",
  attachment: "",
  attachment_url: "",
  file: new File([], ""),
};

export interface IDriverOther {
  doc_id: number;
  name: string;
  expiry_date: string;
  notes: string;
  attachment: string;
  file: File;
  attachment_url: string;
  driver_id: number;
  company_id: number;
}

export const initialDriverOther: IDriverOther = {
  doc_id: 0,
  name: "",
  expiry_date: "",
  notes: "",
  attachment: "",
  attachment_url: "",
  file: new File([], ""),
  driver_id: 0,
  company_id: 0,
};

export interface  IDriverSchedulePayee {
  schedule_id: number;
  driver_id?: number;
  schedule_type_id: number;
  schedule_type_name?: string;
  payment_category_id: number;
  payment_category_name?: string;
  schedule_frequency_id: number;
  schedule_frequency_name?: string;
  start_date: string;
  amount: number;
  schedule_repeat_id: number;
  schedule_repeat_name?: string;
  number_of_times: number;
  end_date?: string;
  notes: string;
  is_active: boolean;
  last_date_of_trans?: string;
  next_date_of_trans?: string;
  company_id?: number;
}

export const initialDriverSchedule: IDriverSchedulePayee = {
  schedule_id: 0,
  driver_id: 0,
  payment_category_id: 0,
  payment_category_name: "",
  schedule_frequency_id: 0,
  schedule_frequency_name: "",
  start_date: "",
  amount: 0,
  schedule_type_id: 0,
  schedule_type_name: "",
  schedule_repeat_id: 0,
  schedule_repeat_name: "",
  number_of_times: 0,
  last_date_of_trans: "",
  next_date_of_trans: "",
  end_date: "",
  notes: "",
  is_active: false,
  company_id: 0,
};

export interface IDriverManagenetProps {
  newDriver: IDriverObject;
  handleInputChange: (
    prop: keyof IDriverObject
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseForm: () => void;
  driverType: IDriverType[] | null;
  driverStatus: IDriverStatus[] | null;
  handleCheckboxChange: () => void;
  SaveDriverIndividual: (event: { preventDefault: () => void }) => void;
  vendorList: IVendorDetails[] | null;
  truckListStatus: ITruckObject[] | null;
  trailerListStatus: ITrailerObject[] | null;
  driverPayRates: IDriverPayRatesOject;
  handleInputDriverPayRates: (
    prop: keyof IDriverPayRatesOject
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
