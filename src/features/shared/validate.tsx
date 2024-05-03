import { isNumber } from "lodash";
import { IMask } from "react-imask";

export const mask={
    phone:'(000)000-00-00'
}

export const PhoneMask = (value:string):string => {
    let masked = IMask.createMask({mask:mask.phone});
    masked.resolve(value);
    return masked.value;
}

export const pattern = {
    onlyNumber: "^[0-9]+$",
    onlyCharacter: "^[a-zA-Z]+$",
    alphanumeric: "^[a-zA-Z0-9]+$",
    mobile: "[0-9]{10}",
    email: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
}

export const Validate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const t = event.target as HTMLInputElement;
    const selectionEnd = !isNumber(t.selectionEnd) ? 0 : t.selectionEnd;
    const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    try {
        const validation = t.getAttribute('validation');        
        let length = parseInt(t.getAttribute('length') as any, 10);        
        length = Number.isNaN(length) ? 0 : length;
        if (validation == 'numeric') {           
            if (!numbers.includes(event.key) && !keys.includes(event.key)) event.preventDefault();
            if (length > 0 && t.value.length>=length && !keys.includes(event.key)) event.preventDefault();
        }
        else if (validation == 'decimal') {
            let suffix = parseInt(t.getAttribute('suffix') as any, 10);
            suffix = Number.isNaN(suffix) ? 2 : suffix;           
            if (!['.'].includes(event.key) && !numbers.includes(event.key) && !keys.includes(event.key)) event.preventDefault();
            if (event.key == '.') {
                if (suffix == 0) event.preventDefault();
                if (t.value.indexOf(".") !== -1) event.preventDefault();
            }
            else {
                if (t.value.indexOf(".") !== -1) {
                    if (t.value.split('.')[1].length === suffix && !keys.includes(event.key) &&
                        selectionEnd > t.value.length - (suffix + 1)) event.preventDefault();
                    if (t.value.split('.')[0].length >= length && length>0 && selectionEnd<=length &&
                        !keys.includes(event.key)
                        ) event.preventDefault();
                }
                else{
                    if (t.value.length >= length && length>0 &&
                        !keys.includes(event.key)
                        ) event.preventDefault();
                }
            }
        }
        else if(validation=='chars'){            
            if (![' ','\''].includes(event.key) && !alphabets.includes(event.key.toLowerCase()) && !keys.includes(event.key)) event.preventDefault();
            if (length > 0 && t.value.length>=length && !keys.includes(event.key)) event.preventDefault();
        }
        else if(validation=='alphanumeric'){            
            if (!numbers.includes(event.key) && !alphabets.includes(event.key.toLowerCase()) && !keys.includes(event.key)) event.preventDefault();
            if (length > 0 && t.value.length>=length && !keys.includes(event.key)) event.preventDefault();
        }
    }
    catch (err: any) {
        console.log(err.Description);
        event.preventDefault();
    }
}