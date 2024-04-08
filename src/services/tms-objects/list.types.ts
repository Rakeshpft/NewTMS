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

  export interface ITrailerTypeObject {
    trailer_type_id: number;
    trailer_type_name: string;
    is_active: boolean;
  }

  export const trailerTypeInitialState : ITrailerTypeObject = {
    trailer_type_id: 0,
    trailer_type_name: "",
    is_active: false
  }

  export interface IPaymentCategoryObject {
    payment_category_id: number;
    payment_category_name: string;
    is_active: boolean;
  }

  export const paymentCategotyInitialState : IPaymentCategoryObject = {
    payment_category_id: 0,
    payment_category_name: "",
    is_active: false
  }
  export interface IProductCodeObject {
    product_code_id: number;
    product_code: string;
    is_active: boolean;
  }

  export const productCodeInitialState : IProductCodeObject = {
    product_code_id: 0,
    product_code: "",
    is_active: false
  }

  export interface IScheduleFrequencyObject {
    schedule_frequency_id: number;
    schedule_frequency_name: string;
    is_active: boolean;
  }

  export const scheduleFrequencyInitialState : IScheduleFrequencyObject = {
    schedule_frequency_id: 0,
    schedule_frequency_name: "",
    is_active: false
  }