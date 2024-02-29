export interface IProfileUpdate {
    email: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    company_id: number;
    logged_in_user_id: number;
    image_url: string;
    image_name: string;
  }
  export const initialProfileUpdateState = {
    email: "",
    first_name: "",
    last_name: "",
    contact_number: "",
    company_id: 0,
    logged_in_user_id: 0,
    image_url: "",
    image_name: "",
  }
  