export interface ITrailerObject {
  trailer_id: number;
  unit: string;
  vin_number: string;
  driver_id: number;
  driver_name: string;
  year: string;
  make: string;
  model: string;
  plate_number: string;
  plate_state_id: number;
  plate_state_name: string;
  description: string;
  is_active: boolean;
  ownership_type_id: number;
  ownership_type_name: string;
  purchase_date: string;
  registration_date: string;
  purchase_price: number;
  lease_date: string;
  lease_lessor_name: string;
  lease_fid: string;
  lease_phone: string;
  lease_suite_number: string;
  address: string;
  lease_street: string;
  lease_city: string;
  lease_state_id: number;
  lease_zipcode: string,
  company_id: number;
  created_date: string,
  created_by_id: number;
  modified_date: string;
  modified_by_id: number;
  warning:boolean;
  trailer_type_id: number;
}

export const trailerInitialState: ITrailerObject = {
  trailer_id: 0,
  unit: "",
  vin_number: "",
  driver_id: 0,
  driver_name: "",
  year: "",
  make: "",
  model: "",
  plate_number: "",
  plate_state_id: 0,
  plate_state_name: "",
  description: "",
  is_active: true,
  ownership_type_id: 0,
  ownership_type_name: "",
  purchase_date: "",
  registration_date: "",
  purchase_price: 0,
  lease_date: "",
  lease_lessor_name: "",
  lease_fid: "",
  lease_phone: "",
  lease_suite_number: "",
  address: "",
  lease_street: "",
  lease_city: "",
  lease_state_id: 0,
  lease_zipcode: "",
  company_id: 0,
  created_date: "",
  created_by_id: 0,
  modified_date: "",
  modified_by_id: 0,
  warning:false,
  trailer_type_id: 0,
}

export interface ITrailerDocument {
  issue_date: string;
  expiry_date: string;
  document_id: number;
  trailer_id: number;
  name: string;
  attachment: string;
  attachment_url: string;
  notes: string;
  file: File;
}

export const trailerDocumentInitialState: ITrailerDocument = {
  issue_date: "",
  expiry_date: "",
  document_id: 0,
  trailer_id: 0,
  name: "",
  attachment: "",
  attachment_url: "",
  notes: "",
  file: new File([], "")
}
export type TtrailerProps = {
  trailer_id?: number;
  handleSubmit?: (obj: ITrailerObject) => void;
}