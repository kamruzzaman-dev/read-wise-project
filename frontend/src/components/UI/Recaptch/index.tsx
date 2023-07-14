import React from "react";
// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
// } from "react-google-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";

const Recaptch = ({ onChange }) => {
  return (
    <ReCAPTCHA
    sitekey="6LdsGQAhAAAAAHMD_9lkPJbQA6I6kA2AxFaVFrF0"
    className="captcha_google"
    onChange={onChange}
  />
  );
};

export default Recaptch;
