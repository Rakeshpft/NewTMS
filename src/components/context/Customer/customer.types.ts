export interface ICustomerObject {
  partner_type_id: number;
  company_name: string;
  address_line1: string;
  address_line2: string;
  phone?: string;
  email: string;
  state_id: number;
  city: string;
  zipcode: string;
  fid_ein: string;
  mc_number: string;
  notes: string;
  customer_type: number;
  customer_billing_type: number;
  quick_pay_fee: string;
  factoring: string;
  pay_terms: string;
  avg_days_to_pay: string;
  vendor_billing_type_id: number;
  is_additional_payee: boolean;
  status_id: boolean;
}

export const initialStateCustomer = {
  partner_type_id: 0,
  company_name: "",
  address_line1: "",
  address_line2: "",
  phone: "",
  email: "",
  state_id: 0,
  city: "",
  zipcode: "",
  fid_ein: "",
  mc_number: "",
  notes: "",
  customer_type: 0,
  customer_billing_type: 0,
  quick_pay_fee: "",
  factoring: "",
  pay_terms: "",
  avg_days_to_pay: "",
  vendor_billing_type_id: 0,
  is_additional_payee: false,
  status_id: false,
};
