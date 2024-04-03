 
  export interface IBillingStatusObject {
    billing_status_id: number;
    billing_status_name: string;
    is_active: boolean;
  }

  export const billingStatusInitialState : IBillingStatusObject = {
    billing_status_id: 0,
    billing_status_name: "",
    is_active: false
  }

  export interface IBillingTypeObject {
    billing_type_id: number;
    billing_type_name: string;
    is_active: boolean;
  }

  export const billingTypeInitialState : IBillingTypeObject = {
    billing_type_id: 0,
    billing_type_name: "",
    is_active: false
  }
