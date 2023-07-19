import { Bounce, toast, ToastOptions } from "react-toastify";

export const Notification = (msg: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const options: ToastOptions = {
        autoClose: 1500,
        type: type,
        hideProgressBar: false,
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
    };
    return toast(msg, options);
};
