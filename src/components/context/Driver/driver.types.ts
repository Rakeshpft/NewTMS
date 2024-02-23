export interface IDriverObject {
  driver_id: number;
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  state_id: number;
  city: string;
  zipcode: string;
  application_date: string;
  hire_date: string;
  fuel_card: string;
  create_new_factor: string;
  pay_to_id: number;
  codriver_name: string;
  truck_id: number;
  trailer_id: number;
  is_IFTA_handled_by_company: number;
  company_id: number;
  created_by_id: number;
  created_date: string;
  modified_by_id: number;
  modified_date: string;
  status_id: boolean;
}

export const initialStateDriver = {
  driver_id: 0,
  first_name: "",
  last_name: "",
  dob: "",
  phone: "",
  email: "",
  address_line1: "",
  address_line2: "",
  state_id: 0,
  city: "",
  zipcode: "",
  application_date: "",
  hire_date: "",
  fuel_card: "",
  create_new_factor: "",
  pay_to_id: 0,
  codriver_name: "",
  truck_id: 0,
  trailer_id: 0,
  is_IFTA_handled_by_company: 0,
  company_id: 0,
  created_by_id: 0,
  created_date: "",
  modified_by_id: 0,
  modified_date: "",
  status_id: false,
};
