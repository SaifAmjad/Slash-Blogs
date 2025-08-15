import React, { useState } from "react";
import PrimaryButton from "../components/UI/PrimaryButton";
import LoginUI from "../components/SignIn/LoginUI";
import OTPLogin from "../components/SignIn/OTPLogin";
import { useNavigate } from "react-router-dom";
import PrimaryAlert from "../components/UI/PrimaryAlert";
import Cookies from "js-cookie";

// const host = "http://localhost:3000";
const host = "https://slash-blog-backend.vercel.app";

const SignIn = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [optError, setOtpError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [alert, setAlert] = useState({
    variant: "success",
    msg: "",
    state: false,
  });

  const navigate = useNavigate();

  const onChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const LogInHandler = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${host}/api/v1/auth/login`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: login.email, password: login.password }),
      });

      const data = await res.json();

      if (data.success) {
        const value = await fetch(`${host}/api/v1/auth/otp`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: login.email }),
        });

        const dataValue = await value.json();
        if (dataValue) {
          setOtp(dataValue.otp);
          setLoader(false);
        }
      } else {
        setAlert({
          variant: "error",
          msg: "Incorrect email or password",
          state: true,
        });
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setAlert({
        variant: "error",
        msg: "Some error occured",
        state: true,
      });
      console.log(error);
    }
  };

  const HandleLogin = async (otpInput) => {
    const optValue = otpInput.join("");
    setLoader(true);
    try {
      if (otp === Number(optValue)) {
        const value = await fetch(`${host}/api/v1/auth/authenticate`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: login.email }),
        });

        const dataValue = await value.json();

        if (dataValue.success) {
          Cookies.set("authToken",dataValue.token);
          setLoader(false);
          setOtpError(false);
          setAlert({
            variant: "success",
            msg: "Successfully loged in",
            state: true,
          });
          navigate("/");
        } else {
          setOtpError(true);
          setLoader(false);
        }
      } else {
        setOtpError(true);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const onSuccessLogin = async (res) => {
    setLoader(true);
    try {
      const response = await fetch(`${host}/api/v1/auth/decode`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: res.credential }),
      });

      const data = await response.json();
      setLogin((prev) => ({ email: data.email, password: "112233" }));

      if (data.success) {
        const value = await fetch(`${host}/api/v1/auth/otp`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        });

        const dataValue = await value.json();
        setOtp(dataValue.otp);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PrimaryAlert
        variant={alert.variant}
        msg={alert.msg}
        state={alert.state}
        setState={setAlert}
      />

      {otp ? (
        <OTPLogin
          optError={optError}
          HandleLogin={HandleLogin}
          loader={loader}
        />
      ) : (
        <LoginUI
          login={login}
          loader={loader}
          onChangeLogin={onChangeLogin}
          LogInHandler={LogInHandler}
          onSuccessLogin={onSuccessLogin}
          disable={disable}
        />
      )}
    </>
  );
};

export default SignIn;
