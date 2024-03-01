export interface IProfileUpdate {
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  image_url: string;
  image_name: string;
  formData?: FormData;
  image_File?: File;
}
export const initialProfileUpdateState: IProfileUpdate = {
  email: "",
  first_name: "",
  last_name: "",
  contact_number: "",
  image_url: "",
  image_name: "",
};
