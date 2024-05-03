export interface ISideMenuObject {
    id: number;
    label:string;
    link:string;
    hasSubmenu:boolean;
    isOpen: boolean;
    icon:string;
    submenuItems:ISideMenuObject[]; 
}

export const sideMenuInitialState:ISideMenuObject={
    id: 0,
    label:"",
    link:"",
    hasSubmenu:false,
    isOpen:false,
    icon:"",
    submenuItems:[]
}