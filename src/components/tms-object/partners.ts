export interface customer {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  mc: string;
  fid: string;
  notes: string;
  stauts: string;
  quickPayFee: string;
  factoring: string;
  credit: string;
  payTerms: string;
  avgDaysToPay: string;
  broker: boolean;
  shipperOrReceiver: boolean;
  radiovalue: string;
}

export const initialCustomerState: customer = {
  companyName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  mc: "",
  fid: "",
  notes: "",
  stauts: "",
  quickPayFee: "",
  factoring: "",
  credit: "",
  payTerms: "",
  avgDaysToPay: "",
  broker: false,
  shipperOrReceiver: false,
  radiovalue: "",
};

export interface vendor {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  fid: string;
  mc: string;
  notes: string;
  additonalPayee: boolean;
}

export const initialVendorState: vendor = {
  companyName: "",
  addressLine1: "",
  addressLine2: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  zip: "",
  fid: "",
  mc: "",
  notes: "",
  additonalPayee: false,
};
