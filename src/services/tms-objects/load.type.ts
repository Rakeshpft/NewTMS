export interface ILoadObject {
  load_id: number;
  load_number: string;
  pickup_date: string;
  pickup_city: string;
  pickup_state_id: number;
  pickup_state_name: string;
  pickup_zipcode: string;
  delivery_date: string;
  delivery_city: string;
  delivery_state_id: number;
  delivery_state_name: string;
  delivery_zipcode: string;
  broker_id: number;
  broker_name: string;
  po_number: string;
  rate: number;
  driver_id: number;
  driver_name: string;
  truck_id: number;
  truck_name: string;
  trailer_id: number;
  trailer_name: string;
  co_driver_id: number;
  co_driver_name: string;
  load_status_id: number;
  load_status_name: string;
  billing_status_id: number;
  billing_status_name: string;
  dispatcher_id: number;
  dispatcher_name: string;
  company_id: number;
  pickupStopList: LoadStopObject[];
  deliveryStopList: LoadStopObject[] ;
}
export interface LoadStopObject {
  stop_id: number;
  load_id: number;
  is_pickup: boolean;
  date: string;
  city: string;
  state_id: number;
  state_name: string;
  zipcode: string;
  company_id: number;
  stop_number: number;
}

export const initialLoadStop: LoadStopObject = {
  stop_id : 0,
  load_id: 0,
  is_pickup: false,
  date: "",
  city: "",
  state_id: 0,
  state_name: "",
  zipcode: "",
  company_id: 0,
  stop_number: 0
  
}
export const initialLoad: ILoadObject = {
  load_id: 0,
  load_number: "",
  pickup_date: "",
  pickup_city: "",
  pickup_state_id: 0,
  pickup_state_name: "",
  pickup_zipcode: "",
  delivery_date: "",
  delivery_city: "",
  delivery_state_id: 0,
  delivery_state_name: "",
  delivery_zipcode: "",
  broker_id: 0,
  broker_name: "",
  po_number: "",
  rate: 0,
  driver_id: 0,
  driver_name: "",
  truck_id: 0,
  truck_name: "",
  trailer_id: 0,
  trailer_name: "",
  co_driver_id: 0,
  co_driver_name: "",
  load_status_id: 0,
  load_status_name: "",
  billing_status_id: 0,
  billing_status_name: "",
  dispatcher_id: 0,
  dispatcher_name: "",
  company_id: 0,
  pickupStopList: [],
  deliveryStopList: []
};

export interface ILoadStatusObject {
  load_status_id: number;
  load_status_name: string;
  is_active: boolean;
}

export const loadStatusInitialState: ILoadStatusObject = {
  load_status_id: 0,
  load_status_name: "",
  is_active: false,
};


export interface IStateObject {
  state_id: number;
  country_id: number;
  state_name: string;
  state_short_name?: null;
  state_code?: null;
}

export const loadInitialState = {
  state_id: 0,
  country_id: 0,
  state_name: "",
  state_short_name: "",
  state_code: "",
};

export type ILoadProps = {
  load_id?: number;
  handleSubmit?: (obj: ILoadStatusObject) => void;
};


export interface  ILoadNotesObject  {
  note_id: number;
  note: string;
  created_date: string;
  created_by_id: number;
  created_by_name: string;
  is_important: boolean;
  
  
}

export const loadNotesInitialState: ILoadNotesObject = {
  note_id: 0,
  note: "",
  created_date: "",
  created_by_id: 0,
  created_by_name: "",
  is_important: false,
};

export interface ILoadServices {

    load_service_id: number;
    load_id: number;
    stop_id: number;
    stop_name: string;
    service_type_id: number;
    schedule_type_id: number;
    payment_category_id: number;
    payment_category_name: string;
    status: boolean;
    amount: number;
    driver_payable: number;
    notes: string;
    paid_by: number;
    attachment: string;
    company_id: number;
    file : File
  
}

export const loadServicesInitialState: ILoadServices = {
  load_service_id: 0,
  load_id: 0,
  stop_id: 0,
  stop_name: "",
  service_type_id: 0,
  schedule_type_id: 0,
  payment_category_id: 0,
  payment_category_name: "",
  status: false,
  amount: 0,
  driver_payable: 0,
  notes: "",
  paid_by: 0,
  attachment: "",
  company_id: 0,
  file : new File([], "")
}

export interface ILoadServiceLumper {

  stop_id : number;
  amount : number;
  notes : string;
  paid_by : number;
  file : File;

}

export interface ILoadServiceDetention {

  stop_id : number;
  status : boolean;
  detention_amount : number;
  amount_payable_to_driver: number;
  notes : string;
  file: File
}

export interface ILoadServiceOther {
  stop_id : number; 
  schedule_type_id : number;
  payment_category_id : number;
  amount : number;
  file : File;
  notes : string;
}

 export interface  ILoadDocuments {
 
    load_id: number;
    attachment: string;
    company_id: number;
    created_date: string;
    load_document_id: number;
    type: string;
    notes: string;
    file?: File;

  }

export const initialLoadDocuments: ILoadDocuments = {
  load_id: 0,
  attachment: "",
  company_id: 0,
  created_date: "",
  load_document_id: 0,
  type: "",
  notes: "",
  file: new File([] , "")
}

export interface ILoadServicesDriverPayable {
  payment_category_id : number;
  stop_id : number;
  amount_payable_to_driver : number;
  notes : string;
  file : File;
}


  



