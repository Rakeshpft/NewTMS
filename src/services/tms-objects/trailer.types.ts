export interface ITrailerObject {
    trailer_id: number;
    unit: number;
    vin_number: number;
    year: string;
    make: string;
    modal: string;
    driver_id: number;
    trailer_plate_id: number;
    plate_state_id: number;
    note: string;
    history: string;
    ownership_id: number;
    purchase_price: number;
    company_id: number;
    created_by_id: number;
    modified_by_id: number;
    status_id: boolean;
    lease_date: string;
    lease_lessor_name: string;
    lease_fid: string;
    lease_address: string;
    lease_address_line2: string;
    lease_city: string;
    lease_state_id: number;
    lease_zipcode: string;
    lease_phone: string;
  }
  

export const initialStateTrailer = {
  trailer_id: 0,
  unit: "",
  vin_number: "",
  year: "",
  make: "",
  modal: "",
  driver_id: 0,
  trailer_plate_id: 0,
  plate_state: "",
  note: "",
  history: "",
  ownership_id: 0,
  purchase_date: "",
  purchase_price: 0,
  company_id: 0,
  created_date: "",
  modified_date: "",
  created_by_id: 0,
  modified_by_id: 0,
  status_id: false,
};
