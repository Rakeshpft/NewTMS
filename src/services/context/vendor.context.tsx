import React, { createContext } from "react";
import { Draft } from "immer";

import { useImmer } from "use-immer";
import { IVendorDetails, IVendorDocument } from "../tms-objects/vendor.types";

export interface IVendorData {
  VendorDetails:IVendorDetails[] | null
  DocumentList:IVendorDocument[] | null
  VendorLoading: boolean;
  is_error : boolean;
  saveVendorSuccess :boolean;
  saveVendorFailed : boolean;
  selectedVendor: IVendorDetails | null; 
}
 
const InitialState: IVendorData = {
  VendorDetails:null,
  DocumentList:null,
  VendorLoading: false,
  is_error : false,
  saveVendorSuccess :false,
  saveVendorFailed : false,
  selectedVendor:null,
};

type VendorUpdateContextType = {
  state: IVendorData;
  setState: (
    f: (draft: Draft<IVendorData>) => void | IVendorData
  ) => void;
};

const VendorUpdateContext = createContext<VendorUpdateContextType>({
  state: InitialState,
  setState: () => undefined,
});

const VendorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<IVendorData>(InitialState);

  return (  
    <VendorUpdateContext.Provider value={{ state, setState }}>
      {children}
    </VendorUpdateContext.Provider>
  );
};

export { VendorUpdateContext, VendorProvider, InitialState };
