import moment from "moment";

export const pattern = {
    onlyNumber : "^[0-9]+$",
    onlyCharacter: "^[a-zA-Z]+$",
    alphanumeric:"^[a-zA-Z0-9]+$",
    mobile:"[0-9]{10}",
    email:"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",

}

export const Dictionary = {
    UserDateFormat:'MM-dd-yyyy',
    UserCurrency:'$',
}

export const Convert = {    
    ToDate:(date:string):any=>{
        try{  return (date=="" ? null :(moment(new Date(date)).format("YYYY-MM-DD")=="1900-01-01"?null:new Date(date))); }
        catch{ return null; }
    },
    ToUserDate : (date:string, format:string=""):string=>{
        if(format!="MM-DD-YYYY" && format !="DD-MM-YYYY" && format!="YYYY-MM-DD"){ format = Dictionary.UserDateFormat.toUpperCase(); }
        try{ return moment(new Date(date)).format(format); }
        catch{ return moment(new Date()).format(format); }
    },
    ToISODate : (date:Date|null):string =>{
        try { return (date==null?"":moment(date).format("YYYY-MM-DDTHH:MM:SS")); }
        catch{ return ""; }
    }
}