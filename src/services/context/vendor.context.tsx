import React , { createContext } from "react";
import { Draft } from "immer";
import { IVendorObject } from "../tms-objects/vendor.types";

import { useImmer } from "use-immer";

export interface IVendorData {
    vendorLoading: boolean;
    vendorList: IVendorObject[] | null;
}

 const initialState: IVendorData = {
    vendorLoading: false,
    vendorList: null
}

type VendorContextType = {
    state: IVendorData;
    setState: (
        f: (draft: Draft<IVendorData>) => void | IVendorData
    ) => void;
};

 const VendorContext = createContext<VendorContextType>({
    state: initialState,
    setState: () => undefined
});

const VendorProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<IVendorData>(initialState);
    return (
        <VendorContext.Provider value={{ state, setState }}>
            {children}
        </VendorContext.Provider>
    );
};

export { VendorContext, VendorProvider , initialState };


