export interface ITruckObject {
  truck_id: number;
  unit: string;
  vin_number: string;
  year: string;
  make: string;
  modal: string;
  driver_name: string;
  plate_id: number;
  plate_state_id: number;
  eld_provider_id: number;
  eld_id: number;
  ownership_id: number;
  purchase_date: string;
  purchase_price: number;
  company_id: number;
  created_date: string;
  modified_date: string;
  created_by_id: number;
  modified_by_id: number;
  status_id: boolean;
}

export const initialStateTruck = {
  truck_id: 0,
  unit: "",
  vin_number: "",
  year: "",
  make: "",
  modal: "",
  driver_name: "",
  plate_id: 0,
  plate_state_id: 0,
  eld_provider_id: 0,
  eld_id: 0,
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
