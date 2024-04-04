export interface IFuelCardObject {
    fuel_card_id:number;
    card_number:string;
    expiration_date:string;
    notes:string;
    is_active:boolean;
    driver_id:number;
    driver_name:string;    
}

export const fuelCardInitialState:IFuelCardObject={
    fuel_card_id:0,
    card_number:"",
    expiration_date:"",
    notes:"",
    is_active:false,
    driver_id:0,
    driver_name:"",
}