import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import AuthCardLayout from "./AuthCardLayout";
import { getLocalStorage, savedLocalStorage } from "../utils/localStorage";
import { useAddLoginMutation } from "../redux/service/userApi/userApi";
import { Notification } from "../components/UI/ToastNotification";
import Input from "../components/UI/Input";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Button from "../components/UI/Button";
import CustomLink from "../components/UI/Link";
export let popupShow = false;
const Login = () => {
    const [errors, setErrors] = useState({}); // error catch
    const navigate = useNavigate();
    const [value, setValue] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    // auth check
    useEffect(() => {
        if (getLocalStorage("testingToken")) {
            navigate("/dashboard");
        }
    }, [navigate]);

    // error
    // useEffect(() => {
    //     setErrors(loginValidate(value));
    // }, [value]);

    // add user
    const [addLogin, { error, data, isLoading }] = useAddLoginMutation();
    console.log(data);
    useEffect(() => {
        if (data?.message) {
            Notification(data?.message, "success");
            navigate("/dashboard");
            savedLocalStorage("testingToken", data?.token);
        } else {
            Notification(error?.data?.message, "error");
        }
    }, [error, data, navigate]);

    if (JSON.parse(getLocalStorage("otp_timer"))) {
        setTimeout(() => { },
            parseInt(JSON.parse(getLocalStorage("otp_timer"))) * 1000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            Notification(errors?.email || errors?.password, "error");
        } else {
            const logData = {
                ...value,
                email: value.email.toLowerCase(),
            };
            console.log(logData);
            await addLogin(logData);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const token = getLocalStorage("testingToken");
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <>
            <Header />
            <div className="rf_dashboard_login_page_wrapper">
                <AuthCardLayout
                    style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
                    className="rf_dashboard_login_card rf_all_card"
                >
                    <div className="rf_section_title">
                        <h2>Login</h2>
                    </div>
                    <div className="hr_border"></div>
                    <div className="rf_dashboard_login_content">
                        <form onSubmit={handleSubmit}>
                            <div className="form_group" style={{ display: "inherit" }}>
                                <Input
                                    label="Email"
                                    type="text"
                                    name="email"
                                    placeholder="Enter your Email Address"
                                    onChange={handleChange}
                                    value={value.email}
                                    className="userid_input input_field"
                                    inputGroupClass="right"
                                />
                            </div>
                            <div className="form_group" style={{ display: "inherit" }}>
                                <Input
                                    label="Password"
                                    type={`${showPassword ? "text" : "password"}`}
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    value={value.password}
                                    className="password_input input_field"
                                    inputGroupClass="right"
                                />
                                <span
                                    style={{ marginTop: "0px" }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </span>
                            </div>
                            <Button type="submit" className="submit_btn">
                                {isLoading ? "Loading..." : "Login"}
                            </Button>
                            <div className="go_to_register">
                                <p>
                                    already haven't any account?&nbsp;
                                    <CustomLink href="/register" className="log_page_nav_link">
                                        Register
                                    </CustomLink>{" "}
                                </p>
                            </div>
                        </form>
                    </div>
                </AuthCardLayout>
            </div>
            <Footer />
        </>
    );
};

export default Login;
