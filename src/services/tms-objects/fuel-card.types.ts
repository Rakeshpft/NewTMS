export interface IFuelCardObject {
    fuel_card_id: number;
    card_number: string;
    expiration_date: string;
    notes: string;
    is_active: boolean;
    driver_id: number;
    driver_name: string;
    assigned_date:string;
}

export const fuelCardInitialState: IFuelCardObject = {
    fuel_card_id: 0,
    card_number: "",
    expiration_date: "",
    notes: "",
    is_active: false,
    driver_id: 0,
    driver_name: "",
    assigned_date:""
}

export interface IFuelCardAssigneeObject {
    assignee_id:number;
    fuel_card_id: number;
    driver_id: number;
    assigned_date: string;
    returned_date: string;
    cancelled_date: string;
    is_cancelled: boolean;
    cancel_reason: string;
    driver_name: string;
}

export const fuelCardAssigneeInitialState: IFuelCardAssigneeObject = {
    assignee_id:0,
    fuel_card_id: 0,
    driver_id: 0,
    assigned_date: "",
    returned_date: "",
    cancelled_date: "",
    is_cancelled: false,
    cancel_reason: "",
    driver_name: "",
}

export interface IAssignFuelCardObject {
    driver_id: number,
    assigned_date: string;
    returned_date: string;
}

export interface IReturnFuelCardObject {
    assignee_id:number;
    returned_date: string;
}

export interface ICancelFuelCardObject {
    assignee_id:number;
    cancel_reason: string,
}
