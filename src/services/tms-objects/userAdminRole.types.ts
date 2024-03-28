
export interface IUserAdminRole {
  permission_id: number;
  menu_id: number;
  role_id: number;
  company_id: number;
  is_read: boolean;
  is_write: boolean;
  menu_name: string;
  menu_url: string;
  parent_menu_id: number;
  position_on_screen: number;
  child?: IUserAdminRole[] | null;
}
export const initialUserAdminRole = {
  permission_id: 0,
  menu_id: 0,
  role_id: 0,
  company_id: 0,
  is_read: false,
  is_write: false,
  menu_name: "",
  menu_url: "",
  parent_menu_id: 0,
  position_on_screen: 0,
  child: null,
};

