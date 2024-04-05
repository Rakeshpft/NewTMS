export interface ITrailerObject {
  trailer_id: number;
  unit: string;
  vin_number: string;
  driver_id: number;
  year: string;
  make: string;
  model: string;
  plate_number: string;
  plate_state_id: number;
  description: string;
  is_active: boolean;
  ownership_type_id: number;
  purchase_date: string;
  purchase_price: string;
  lease_date: string;
  lease_lessor_name: string;
  lease_fid: string;
  lease_phone: string;
  lease_suite_number: string;
  lease_street: string;
  lease_city: string;
  lease_state_id: number;
  lease_zipcode: string,
  company_id: number;
  created_date: string,
  created_by_id: number;
  modified_date: string;
  modified_by_id: number;
  trailer_type_id: number;
}

export const trailerInitialState: ITrailerObject = {
  trailer_id: 0,
  unit: "",
  vin_number: "",
  driver_id: 0,
  year: "",
  make: "",
  model: "",
  plate_number: "",
  plate_state_id: 0,
  description: "",
  is_active: false,
  ownership_type_id: 0,
  purchase_date: "",
  purchase_price: "",
  lease_date:"",
  lease_lessor_name:"",
  lease_fid:"",
  lease_phone:"",
  lease_suite_number:"",
  lease_street:"",
  lease_city:"",
  lease_state_id:0,
  lease_zipcode:"",
  company_id: 0,
  created_date:"",
  created_by_id: 0,
  modified_date:"",
  modified_by_id: 0,
  trailer_type_id: 0,
}
