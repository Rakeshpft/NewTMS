import { Bounce, Flip, Zoom, Slide, toast } from "react-toastify";

export interface IToastProps {
    message: string|undefined,
    type: string|undefined,
    position: string|undefined,
    autoClose: number|undefined,
    hideProgressBar: boolean|undefined,
    closeOnClick: boolean|undefined,
    pauseOnHover: boolean|undefined,
    draggable: boolean|undefined,
    theme: string|undefined,
    transition: string|undefined,
}

export const defaultIToastProps: IToastProps = {
    message: 'No message given.',
    type: 'info',
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    transition: 'bounce'
}

const inititializeIToastProp = (props: IToastProps): IToastProps => {
    props.message = props.message == undefined ? defaultIToastProps.message : props.message;
    props.type = props.type == undefined ? defaultIToastProps.type : props.type;
    props.position = props.position == undefined ? defaultIToastProps.position : props.position;
    props.autoClose = props.autoClose == undefined ? defaultIToastProps.autoClose : props.autoClose;
    props.hideProgressBar = props.hideProgressBar == undefined ? defaultIToastProps.hideProgressBar : props.hideProgressBar;
    props.closeOnClick = props.closeOnClick == undefined ? defaultIToastProps.closeOnClick : props.closeOnClick;
    props.pauseOnHover = props.pauseOnHover == undefined ? defaultIToastProps.pauseOnHover : props.pauseOnHover;
    props.draggable = props.draggable == undefined ? defaultIToastProps.draggable : props.draggable;
    props.theme = props.theme == undefined ? defaultIToastProps.theme : props.theme;
    props.transition = props.transition == undefined ? defaultIToastProps.transition : props.transition;
    return props;
}

export const toastify = (props: any) => {
    props = inititializeIToastProp(props);
    props.type == "success" && toast.success(props.message, {
        position: (props.position == 'top-right' ? 'top-right' : (props.position == 'top-left' ? 'top-left' :
            (props.position == 'bottom-right' ? 'bottom-right' : (props.position == 'bottom-left' ? 'bottom-left' :
                (props.position == 'bottom-center' ? 'bottom-center' : 'top-center'))))),
        autoClose: props.autoClose,
        hideProgressBar: props.hideProgressBar,
        closeOnClick: props.closeOnClick,
        pauseOnHover: props.pauseOnHover,
        draggable: props.draggable,
        theme: props.theme,
        transition: (props.transition == "Flip" ? Flip : (props.transition == "Zoom" ? Zoom : (props.transition == "Slids" ? Slide : Bounce))),
    });
    props.type == "warning" && toast.warning(props.message, {
        position: (props.position == 'top-right' ? 'top-right' : (props.position == 'top-left' ? 'top-left' :
            (props.position == 'bottom-right' ? 'bottom-right' : (props.position == 'bottom-left' ? 'bottom-left' :
                (props.position == 'bottom-center' ? 'bottom-center' : 'top-center'))))),
        autoClose: props.autoClose,
        hideProgressBar: props.hideProgressBar,
        closeOnClick: props.closeOnClick,
        pauseOnHover: props.pauseOnHover,
        draggable: props.draggable,
        theme: props.theme,
        transition: (props.transition == "Flip" ? Flip : (props.transition == "Zoom" ? Zoom : (props.transition == "Slids" ? Slide : Bounce))),
    });
    props.type == "error" && toast.error(props.message, {
        position: (props.position == 'top-right' ? 'top-right' : (props.position == 'top-left' ? 'top-left' :
            (props.position == 'bottom-right' ? 'bottom-right' : (props.position == 'bottom-left' ? 'bottom-left' :
                (props.position == 'bottom-center' ? 'bottom-center' : 'top-center'))))),
        autoClose: props.autoClose,
        hideProgressBar: props.hideProgressBar,
        closeOnClick: props.closeOnClick,
        pauseOnHover: props.pauseOnHover,
        draggable: props.draggable,
        theme: props.theme,
        transition: (props.transition == "Flip" ? Flip : (props.transition == "Zoom" ? Zoom : (props.transition == "Slids" ? Slide : Bounce))),
    });
    props.type == "info" && toast.info(props.message, {
        position: (props.position == 'top-right' ? 'top-right' : (props.position == 'top-left' ? 'top-left' :
            (props.position == 'bottom-right' ? 'bottom-right' : (props.position == 'bottom-left' ? 'bottom-left' :
                (props.position == 'bottom-center' ? 'bottom-center' : 'top-center'))))),
        autoClose: props.autoClose,
        hideProgressBar: props.hideProgressBar,
        closeOnClick: props.closeOnClick,
        pauseOnHover: props.pauseOnHover,
        draggable: props.draggable,
        theme: props.theme,
        transition: (props.transition == "Flip" ? Flip : (props.transition == "Zoom" ? Zoom : (props.transition == "Slids" ? Slide : Bounce))),
    });
    props.type && !["success", "warning", "error", "info"].includes(props.type) && toast(props.message, {
        position: (props.position == 'top-right' ? 'top-right' : (props.position == 'top-left' ? 'top-left' :
            (props.position == 'bottom-right' ? 'bottom-right' : (props.position == 'bottom-left' ? 'bottom-left' :
                (props.position == 'bottom-center' ? 'bottom-center' : 'top-center'))))),
        autoClose: props.autoClose,
        hideProgressBar: props.hideProgressBar,
        closeOnClick: props.closeOnClick,
        pauseOnHover: props.pauseOnHover,
        draggable: props.draggable,
        theme: props.theme,
        transition: (props.transition == "Flip" ? Flip : (props.transition == "Zoom" ? Zoom : (props.transition == "Slids" ? Slide : Bounce))),
    });
}