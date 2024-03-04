export interface IUserFormState {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role_id: number;
  staff_id: number;
}

export const initialUserFormState : IUserFormState = {
  first_name: "",
  last_name: "",
  email: "",
  contact_number: "",
  role_id: 0,
  staff_id: 0
}

export interface  IUserManagementProps  {
    modalOpen: boolean;
    closeModal: () => void;
}
    


