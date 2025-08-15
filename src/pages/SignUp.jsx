import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPSignup from "../components/SignUp/OTPSignup";
import SignupUI from "../components/SignUp/SignupUI";
import PrimaryAlert from "../components/UI/PrimaryAlert";
import Cookies from "js-cookie";

// const host = "http://localhost:3000";
const host='https://slash-blog-backend.vercel.app'

const SignUp = () => {
  const [signup, setSignUp] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [optError, setOtpError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    variant: "success",
    msg: "",
    state: false,
  });

  const navigate = useNavigate();

  const onChangeSignUp = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };

  const SignUpHandler = async (e) => {
    setLoader(true);

    if (!signup.email || !signup.password || !signup.name) {
      alert("Empty input fields");
      return;
    }

    try {
      const user = await fetch(`${host}/api/v1/auth/checkuser`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signup.email }),
      });

      const userData = await user.json();

      if (userData.success) {
        const value = await fetch(`${host}/api/v1/auth/otp`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: signup.email }),
        });

        const dataValue = await value.json();
        if (dataValue) {
          setLoader(false);
          setOtp(dataValue.otp);
        }
      } else {
        setAlert({
            variant: "error",
            msg: "User already exist. Please login to continue",
            state: true,
          });
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const HandleSignup = async (otpInput) => {
    const optValue = otpInput.join("");
    setLoader(true);
    try {
      if (otp === Number(optValue)) {
        const res = await fetch(`${host}/api/v1/auth/signup`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signup.name,
            email: signup.email,
            password: signup.password,
          }),
        });

        const data = await res.json();

        if (data.success) {
          const value = await fetch(`${host}/api/v1/auth/authenticate`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: signup.email }),
          });

          const dataValue = await value.json();

          if (dataValue.success) {
            Cookies.set("authToken",dataValue.token);
            setOtpError(false);
            setLoader(false);
            navigate("/");
          } else {
            setOtpError(true);
            setLoader(false);
          }
        }
      } else {
        setOtpError(true);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const onSuccessSignup = async (res) => {
    try {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
          },
        }
      );

      const data = await userInfo.json();

      if (data) {
        const user = await fetch(`${host}/api/v1/auth/checkuser`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        });

        const userData = await user.json();

        if (userData.success) {
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
          if (dataValue.success) {
            setOtp(true);
          } else {
          }
        } else {
          setAlert({
            variant: "error",
            msg: "User already exist. Please login to continue",
            state: true,
          });
        }
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
        <OTPSignup
          optError={optError}
          HandleSignup={HandleSignup}
          loader={loader}
        />
      ) : (
        <SignupUI
          signup={signup}
          onChangeSignUp={onChangeSignUp}
          SignUpHandler={SignUpHandler}
          loader={loader}
          onSuccessSignup={onSuccessSignup}
        />
      )}
    </>
  );
};

export default SignUp;
