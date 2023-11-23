export interface fuelCard {
  cardNumber: string;
  active: string;
  expirationDate: string;
  truck: string;
  notes: string;
  driver: string;
  assignOn: string;
  returnedOn: string;
  equipmentOwner: string;
}

export const initialFuelCardState: fuelCard = {
  cardNumber: "",
  active: "",
  expirationDate: "",
  truck: "",
  notes: "",
  driver: "",
  assignOn: "",
  returnedOn: "",
  equipmentOwner: "",
};

export interface fuelTransaction {
  driver: string;
  addnew: string;
  additionalPayee: string;
  fuelCard: string;
  date: string;
  amount: string;
  ifta: boolean;
  city: string;
  state: string;
  unitGallons: string;
  productCode: string;
  zip: string;
  truck: string;
  trailer: string;
  notes: string;
}

export const initialFuelTransactionState: fuelTransaction = {
  driver: "",
  addnew: "",
  additionalPayee: "",
  fuelCard: "",
  date: "",
  amount: "",
  ifta: false,
  city: "",
  state: "",
  unitGallons: "",
  productCode: "",
  zip: "",
  truck: "",
  trailer: "",
  notes: "",
};
