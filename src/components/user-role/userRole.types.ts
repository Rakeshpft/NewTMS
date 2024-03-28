import { INewUserRoleDetails } from "../../services/tms-objects/userRole.types";


export interface IUserRoleFormState {
    role_id : number ;
    role_name :string;
    company_id : number;
    description: string;
    active:boolean;
}

export const initialUserRoleFormState : IUserRoleFormState = {
    role_id : 0,
    role_name :"",
    company_id : 0,
    description: "",
    active :true ,
}

export interface  IUserRoleManagementProps  {
    modalOpen: boolean;
    closeModal: () => void;
    selectedUserRole: INewUserRoleDetails | null;
    userRoleNewDetails: IUserRoleFormState;
    setUserRoleDetails : React.Dispatch<React.SetStateAction<IUserRoleFormState>>
    handleInputChange: (prop: keyof IUserRoleFormState) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveUserRole: (event: { preventDefault: () => void }) => void;
    title: Boolean;
    handleCheckBox : () => void;
   
    
  
}