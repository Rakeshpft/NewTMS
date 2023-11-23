export interface LoadPage {
  status: string;
  pickupDate: string;
  deliveryDate: string;
  notes: string;
  billingStatus: string;
  pickupCity: string;
  deliveryCity: string;
  dispatcher: string;
  pickupState: string;
  deliveryState: string;
  pickupZip: string;
  deliveryZip: string;
  broker: string;
  driver: string;
  truck: string;
  trailer: string;
  rate: string;
  po: string;
}

export const initialLoadState: LoadPage = {
  status: "",
  pickupDate: "",
  deliveryDate: "",
  notes: "",
  pickupCity: "",
  deliveryCity: "",
  billingStatus: "",
  dispatcher: "",
  pickupState: "",
  deliveryState: "",
  pickupZip: "",
  deliveryZip: "",
  broker: "",
  driver: "",
  truck: "",
  trailer: "",
  rate: "",
  po: "",
};

export interface SearchLoadPage {
  period: string;
  pickupDate: string;
  deviveryDate: string;
  broker: string;
  city: string;
  driver: string;
  state: string;
  dispatcher: string;
  truck: string;
  trailer: string;
  directBilling: string;
}

export const initialSearchState: SearchLoadPage = {
  period: "",
  pickupDate: "",
  deviveryDate: "",
  broker: "",
  city: "",
  driver: "",
  dispatcher: "",
  truck: "",
  trailer: "",
  directBilling: "",
  state: "",
};
