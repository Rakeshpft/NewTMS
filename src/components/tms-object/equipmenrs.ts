export interface truckType {
  unit: string;
  vin: string;
  ELDprovider: string;
  ELDid: string;
  year: string;
  make: string;
  ownership: string;
  modal: string;
  purchaseDate: string;
  purchasePrice: string;
  driver: string;
  plate: string;
  plateState: string;
  notes: string;
  history: string;
}

export const initialTruckState: truckType = {
  unit: "",
  vin: "",
  ELDprovider: "",
  ELDid: "",
  year: "",
  make: "",
  ownership: "",
  modal: "",
  purchaseDate: "",
  purchasePrice: "",
  driver: "",
  plate: "",
  plateState: "",
  notes: "",
  history: "",
};

export interface trailersTypes {
  unit: string;
  vin: string;
  year: string;
  make: string;
  ownership: string;
  modal: string;
  purchaseDate: string;
  purchasePrice: string;
  driver: string;
  plate: string;
  plateState: string;
  notes: string;
  history: string;
}

export const initialTrailerState: trailersTypes = {
  unit: "",
  vin: "",
  year: "",
  make: "",
  ownership: "",
  modal: "",
  purchaseDate: "",
  purchasePrice: "",
  driver: "",
  plate: "",
  plateState: "",
  notes: "",
  history: "",
};