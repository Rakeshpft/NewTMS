import moment from "moment";

export const Dictionary = {
    UserDateFormat: 'MM-dd-yyyy',
    UserCurrency: '$',
}

export const Convert = {
    ToDate: (date?: string): any => {
        date = date == null ? "" : date;
        try { return (date == "" ? null : (moment(new Date(date)).format("YYYY-MM-DD") == "1900-01-01" ? null : new Date(date))); }
        catch { return null; }
    },
    ToUserDate: (date?: string, format: string = ""): string => {
        if (format != "MM-DD-YYYY" && format != "DD-MM-YYYY" && format != "YYYY-MM-DD") { format = Dictionary.UserDateFormat.toUpperCase(); }
        try {
            date = date == null || date == undefined || date == "" ? "1900-01-01" : date;
            return moment(new Date(date)).format("YYYY-MM-DD") == "1900-01-01" ? "" : moment(new Date(date)).format(format);
        }
        catch { return moment(new Date()).format(format); }
    },
    ToISODate: (date: Date | null): string => {
        try { return (date == null ? "" : moment(date).format("YYYY-MM-DDTHH:MM:SS")); }
        catch { return ""; }
    },
    ToMonthYear: (date: Date | null): string => {
        try { return (date == null ? "" : moment(date).format("MM-YYYY")); }
        catch { return ""; }
    },
    ToYear: (date: Date | null): string => {
        try { return (date == null ? "" : moment(date).format("YYYY")); }
        catch { return ""; }
    },
    MonthYearToDate:(monthYear?:string):Date=>{
        try{
            if(monthYear!=null && monthYear!=undefined && monthYear!=""){
                monthYear = monthYear.split('-')[1]+"-"+monthYear.split('-')[0]+'-01';
            }
        }
        catch{ monthYear = ""; }        
        let date = monthYear == null || monthYear == "" ? new Date() : new Date(monthYear);
        return date;
    },
    YearToDate:(year?:string):Date=>{
        try{
            if(year!=null && year!=undefined && year!=""){
                year = year+'-01-01';
            }
        }
        catch{ year = ""; }        
        let date = year == null || year == "" ? new Date() : new Date(year);
        return date;
    },

    ToUserAmount:(amount:number):string=>{
        if(amount<0){ return "-" + Dictionary.UserCurrency + parseFloat((0-amount).toString()).toFixed(2); }
        else{ return Dictionary.UserCurrency + parseFloat(amount.toString()).toFixed(2); }
    }
}

export const Helper = {
    ImageUrl: (url: string): string => {
        return (url.startsWith('blob') ? '' : url + "?" + new Date().getTime());
    },
    FileDownload: async (url?: string) => {
        if (url != null && url != undefined && url != "") {
            try {
                // Fetch the file from the URL
                // const response = await fetch(url);
                // const blob = await response.blob();
                var fileSplit = url.split('.');
                var fileExt = '';
                if (fileSplit.length > 1) {
                    fileExt = fileSplit[fileSplit.length - 1];
                }
                // Create a temporary anchor element
                const anchorElement = document.createElement('a');
                anchorElement.target = "_blank";
                anchorElement.href = url; //URL.createObjectURL(blob);
                anchorElement.download = Date.now().toString() + '.' + fileExt;
                // Trigger the download by simulating a click on the anchor element
                document.body.appendChild(anchorElement);
                anchorElement.click();
                // Cleanup
                document.body.removeChild(anchorElement);
                URL.revokeObjectURL(anchorElement.href);
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }
    },
}