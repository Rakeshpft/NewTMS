export interface IBillingLoadObject {
    load_billing_status_id: number;
    load_billing_status_name: string;
    is_active: boolean;
  }

  export const billingInitialStatus = {
    load_billing_status_id: 0,
    load_billing_status_name: "",
    is_active: false
  }
  