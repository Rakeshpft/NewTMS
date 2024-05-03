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

  export interface IScheduleTypeObject {
    schedule_type_id: number;
    schedule_type_name: string;
    is_active: boolean;
  }

  export const scheduleTypeInitialState : IScheduleTypeObject = {
    schedule_type_id: 0,
    schedule_type_name: "",
    is_active: false
  }

  export interface IScheduleRepeatObject {
    schedule_repeat_id: number;
    schedule_repeat_name: string;
    is_active: boolean;
  }

  export const scheduleRepeatInitialState : IScheduleRepeatObject = {
    schedule_repeat_id: 0,
    schedule_repeat_name: "",
    is_active: false
  }

  export interface IELDProviderObject {
    eld_provider_id: number;
    eld_provider_name: string;
    is_active: boolean;
  }

  export const eldProvideInitialState : IELDProviderObject = {
    eld_provider_id: 0,
    eld_provider_name: "",
    is_active: false
  }

  export interface IDriverListObject {
    driver_id: number;
    driver_name: string;
    vendor_id: number;
    vendor_name: string;
    truck_id:number;
    truck_name:string;
    trailer_id:number;
    trailer_name:string;
  }

  export const driverInitialState : IDriverListObject = {
    driver_id: 0,
    driver_name: "",
    vendor_id: 0,
    vendor_name:"",
    truck_id:0,
    truck_name:"",
    trailer_id:0,
    trailer_name:""
  }
  
  export interface IDriverFilter  {
    unassigned:boolean,
    is_trailer:boolean,
    equipment_id:number    
  }

  export const driverFilterInitialState:IDriverFilter ={
    unassigned:false,
    is_trailer:false,
    equipment_id:0
  }

  export interface IPayRateTypeObject {
    pay_rate_type_id: number;
    pay_rate_type_name: string;
    is_active: boolean;
  }

  export const payRateTypeInitialState : IPayRateTypeObject = {
    pay_rate_type_id: 0,
    pay_rate_type_name: "",
    is_active: false
  }

  export interface IVendorListObject {
    vendor_id: number;
    vendor_name: string;
    is_active: boolean;
  }

  export const vendorListInitialState : IVendorListObject = {
    vendor_id: 0,
    vendor_name: "",
    is_active: false
  }

  export interface ITruckListObject {
    truck_id: number;
    truck_name: string;
    driver_id:number;
    driver_name:string;
    is_active: boolean;
  }

  export const truckListInitialState : ITruckListObject = {
    truck_id: 0,
    truck_name: "",
    driver_id:0,
    driver_name:"",
    is_active: false
  }  
  export interface ITruckFilter  {
    unassigned:boolean
  }

  export interface ITrailerListObject {
    trailer_id: number;
    trailer_name: string;
    driver_id:number;
    driver_name:string;
    is_active: boolean;
  }  
  export const trailerListInitialState : ITrailerListObject = {
    trailer_id: 0,
    trailer_name: "",
    driver_id:0,
    driver_name:"",
    is_active: false
  }
  export interface ITrailerFilter  {
    unassigned:boolean,
    driver_id:number
  }

   export interface ITruckFilter  {
    unassigned:boolean,
    driver_id:number
  }

  export interface IDispatcherListObject {
    dispatcher_id: number;
    dispatcher_name: string;
    is_active: boolean;
  }

  export const dispatcherListInitialState : IDispatcherListObject = {
    dispatcher_id: 0,
    dispatcher_name: "",
    is_active: false
  }

  export interface IFuelCardListObject {
    fuel_card_id: number;
    card_number: string;
  }  
  export const fuelcardInitialState : IFuelCardListObject = {
    fuel_card_id: 0,
    card_number: "",
  }
  
  export interface IPaymentMethodObject {
    payment_method_id: number;
    payment_method_name: string;
    is_active:boolean;
  }  
  export const paymentMethodInitialState : IPaymentMethodObject = {
    payment_method_id: 0,
    payment_method_name: "",
    is_active:false
  }
  
  export interface ILoadStop {
    load_stop_id: number;
    load_stop_name: string;
  }  
  export const loadStopInitialState : ILoadStop = {
    load_stop_id: 0,
    load_stop_name: "",
  }