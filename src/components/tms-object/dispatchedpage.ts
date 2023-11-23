export interface newFilterPage {
  name: string;
  driver: driverName[];
}

interface driverName {
  driverName: string;
}

export const initialNewFilterPageState: newFilterPage = {
  name: "",
  driver: [],
};
