import { IInviteUserDetails, IUserRole } from "../../services/tms-objects/user.types";

export interface IUserFormState {
  first_name: string;
  full_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role_id: number;
  staff_id: number;
  active: boolean ;    
  
}

export const initialUserFormState : IUserFormState = {
  first_name: "",
  last_name: "",
  full_name: "",
  email: "",
  contact_number: "",
  role_id: 0,
  staff_id: 0,
  active: true
}

export interface  IUserManagementProps  {
    modalOpen: boolean;
    closeModal: () => void;
    selectedUser: IInviteUserDetails | null;
    userNewDetails: IUserFormState;
    setUserDetails : React.Dispatch<React.SetStateAction<IUserFormState>>
    handleInputChange: (prop: keyof IUserFormState) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveUser: (event: { preventDefault: () => void }) => void;
    title: Boolean;
    userRole: IUserRole[] | null;
    handleCheckBox: () => void;
    
}
    


