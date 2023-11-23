export interface driverpage {
  firstName: string;
  Stauts: string;
  lastName: string;
  dob: string;
  appDate: string;
  payTo: string;
  phone: string;
  email: string;
  hireDate: string;
  coDriver: string;
  addressline1: string;
  addressline2: string;
  truck: string;
  city: string;
  state: string;
  zip: string;
  trailer: string;
  ifta: boolean;
  createNewPartner: boolean;
  fuelCard: string;
  permiles: string;
  perExtraStop: string;
  perEmptyMiles: string;
  radiovalue1: string;
  radiovalue2: string;
  imageUrl: string | null;
}

export const initialDriverState: driverpage = {
  firstName: "",
  Stauts: "",
  lastName: "",
  dob: "",
  appDate: "",
  payTo: "",
  phone: "",
  email: "",
  hireDate: "",
  coDriver: "",
  addressline1: "",
  addressline2: "",
  truck: "",
  city: "",
  state: "",
  zip: "",
  trailer: "",
  ifta: false,
  createNewPartner: false,
  fuelCard: "",
  permiles: "",
  perExtraStop: "",
  perEmptyMiles: "",
  radiovalue1: "",
  radiovalue2: "",
  imageUrl: null,
};

export interface searchDriverPage {
  type: string;
  status: string;
}

export const initialSearchDriverState: searchDriverPage = {
  type: "",
  status: "",
};
