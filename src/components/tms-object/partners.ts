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
  cutomerType: string;
  directBilling: boolean;
  factoringBilling: boolean;
}

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
  additonalPayee: string;
}
