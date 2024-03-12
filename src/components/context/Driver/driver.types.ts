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
  fuel_card: string;
  create_new_factor: string;
  pay_to_id: number;
  codriver_name: string;
  truck_id: number;
  trailer_id: number;
  is_IFTA_handled_by_company: number;
  status_id: boolean;
  note: string;
  driver_images: string;
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
  fuel_card: "",
  create_new_factor: "",
  pay_to_id: 0,
  codriver_name: "",
  truck_id: 0,
  trailer_id: 0,
  is_IFTA_handled_by_company: 0,
  status_id: false,
  note: "",
  driver_images: "",
};
