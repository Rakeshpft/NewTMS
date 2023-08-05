export interface fuelCard {
  cardNumber: string;
  active: string;
  expirationDate: string;
  truck: string;
  notes: string;
}

export interface fuelTransaction {
  driver: string;
  addnew: string;
  additionalPayee: string;
  fuelCard: string;
  date: string;
  amount: string;
  ifta: string;
  city: string;
  state: string;
  unitGallons: string;
  productCode: string;
  zip: string;
  truck: string;
  trailer: string;
  notes: string;
}
