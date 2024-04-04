export interface IDocumentStatusObject {
    status_id: number;
    status_name: string;
    is_active: boolean;
  }

  export const documentStatusInitialState : IDocumentStatusObject = {
    status_id: 0,
    status_name: "",
    is_active: false
  }


  export interface IOwnershipTypeObject {
    ownership_type_id: number;
    ownership_type_name: string;
    is_active: boolean;
  }

  export const ownershipTypeInitialState : IOwnershipTypeObject = {
    ownership_type_id: 0,
    ownership_type_name: "",
    is_active: false
  }

  export interface IFactorObject {
    factor_id: number;
    factor_name: string;
  }

  export const factorInitialState : IFactorObject = {
    factor_id: 0,
    factor_name: "",
  }