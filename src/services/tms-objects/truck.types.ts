export interface  ITruckObject {
   

    truck_id: number;
    unit: string;
    vin_number: string;
    year: string;
    make: string;
    model: string;
    driver_id: number;
    driver_name : string;
    plate_number: number;
    plate_state_id: number;
    plate_state_name: string;
    description: string;
    is_active: boolean;
    eld_provider_id: number;
    eld_provider_name: string;
    eld_id: string;
    ownership_type_id: number;
    ownership_type_name: string;
    purchase_date: string;
    registration_date: string;
    purchase_price: number;
    lease_date: string;
    lease_lessor_name: string;
    lease_fid: string;
    location:string;
    lease_suite_number: string;
    lease_street: string;
    lease_city: string;
    lease_state_id: number;
    lease_state_name: string;
    lease_zipcode: string;
    warning:boolean;
    lease_phone: string;
    company_id: number;
  }
  


export const initialStateTruck : ITruckObject = {
  truck_id: 0,
  unit: '',
  vin_number: '',
  year: '',
  make: '',
  model: '',
  driver_id: 0,
  driver_name:"",
  plate_number: 0,
  plate_state_id: 0,
  plate_state_name:"",
  description: "",
  is_active: true,
  eld_provider_id: 0,
  eld_provider_name: "",
  eld_id: "",
  ownership_type_id: 0,
  ownership_type_name: "",
  purchase_date: "",
  registration_date: "",
  purchase_price: 0,
  lease_date: '',
  lease_lessor_name: '',
  lease_fid: '',
  location: '',
  lease_suite_number: "",
  lease_street: "",
  lease_city: "",
  lease_state_id: 0,
  lease_state_name: "",
  lease_zipcode: "",
  warning: false,
  lease_phone: "",
  company_id: 0,
};

export interface ITruckDocument{
  
  document_id: number;
 issue_date:string
expiry_date:string
name:string
attachment:string
attachment_url:string
notes:string
truck_id:number
file:File
company_id:number
created_by_id:number
created_date:string
modified_by_id:number
modified_date:string
}

export const initialStateTruckDocument : ITruckDocument = {
  document_id: 0,
  issue_date:'',
  expiry_date:'',
  name:'',
  attachment:'',
  attachment_url:'',
  notes:'',
  truck_id:0,
  file : new File([], ""),
  company_id:0,
  created_by_id:0,
  created_date:'',
  modified_by_id:0,
  modified_date:'',
}