export interface ITruckObject {

    truck_id: number;
    unit: string;
    vin_number: string;
    year: string;
    make: string;
    modal: string;
    driver_id: number;
    driver_name : string;
    plate_number: number;
    plate_state_id: number;
    plate_state_name: string;
    description: string;
    is_active: boolean;
    eld_provider_id: number;
    eld_provider_name: string;
    eld_id: number;
    ownership_type_id: number;
    ownership_type_name: string;
    purchase_date: string;
    purchase_price: number;
    lease_date: string;
    lease_lessor_name: string;
    lease_fid: string;
    lease_suite_number: string;
    lease_street: string;
    lease_city: string;
    lease_state_id: number;
    lease_state_name: string;
    lease_zipcode: string;
    lease_phone: string;
    company_id: number;
  }
  


export const initialStateTruck : ITruckObject = {
  truck_id: 0,
  unit: '',
  vin_number: '',
  year: '',
  make: '',
  modal: '',
  driver_id: 0,
  driver_name:"",
  plate_number: 0,
  plate_state_id: 0,
  plate_state_name:"",
  description: "",
  is_active: false,
  eld_provider_id: 0,
  eld_provider_name: "",
  eld_id: 0,
  ownership_type_id: 0,
  ownership_type_name: "",
  purchase_date: "",
  purchase_price: 0,
  lease_date: '',
  lease_lessor_name: '',
  lease_fid: '',
  lease_suite_number: "",
  lease_street: "",
  lease_city: "",
  lease_state_id: 0,
  lease_state_name: "",
  lease_zipcode: "",
  lease_phone: "",
  company_id: 0,
};

