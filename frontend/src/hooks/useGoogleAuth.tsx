import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { useAddGoogleAuthMutation } from "../redux/features/user/userApi";
import { saveToLocalStorage } from "../utils/localstorage";
import { Notification } from "../components/ui/notification";

export function useGoogleAuth() {
    const navigate = useNavigate();
    const { state } = useLocation();
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId:
                    "733785501526-kf7fkkbo5i29t9kjq2npllh2fd14fvhj.apps.googleusercontent.com",
                plugin_name: "simple",
            });
        });
    }, []);
    const [addGoogleAuth, { data: google, isLoading, isSuccess, isError }] = useAddGoogleAuthMutation();
    const responseSuccessGoogle = async (response: any) => {
        console.log(response)
        await addGoogleAuth(response?.tokenObj?.id_token);
    };
    useEffect(() => {
        if (isSuccess && !isLoading) {
            if (state?.path) {
                navigate(state?.path);
            } else {
                navigate('/');
            }
            Notification("You have logged in successfully.", "success")
            saveToLocalStorage('access-token', google?.data?.accessToken);
            saveToLocalStorage('user_Information', JSON.stringify(google?.data?.userData));
        }
    }, [google, navigate]);

    const responseErrorGoogle = (error: any) => {
        console.log(error);
    };
    return { responseSuccessGoogle, responseErrorGoogle, isLoading };
}
