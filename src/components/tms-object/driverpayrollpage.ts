export interface driverpayrollPage {
  driver: string;
  partner: string;
  dateRangeTo: string;
  dateRangeFrom: string;
  radiovalue: string;
}

export const initialDriverPayRollPageState: driverpayrollPage = {
  driver: "",
  partner: "",
  dateRangeTo: "",
  dateRangeFrom: "",
  radiovalue: "",
};
