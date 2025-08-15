import React, { useEffect, useRef, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";

const OTPSignup = ({optError, HandleSignup,loader}) => {
  const [otpInput, setOtpInput] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const updatedOtp = [...otpInput];
    updatedOtp[index] = value[0];
    setOtpInput(updatedOtp);

    if (index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otpInput];
      updatedOtp[index] = "";
      setOtpInput(updatedOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form class="w-full max-w-md">
            <img
              class="w-20"
              src="https://img.freepik.com/premium-photo/credit-card-laptop-computer_956369-6948.jpg?w=740"
              alt=""
            />

            <h1 class="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
              OTP
            </h1>

            <div class="mt-3 flex items-center gap-3">
              {otpInput.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              ))}
            </div>
            {optError ? (
              <p class="mt-3 text-xs text-red-400">Incorrect OTP</p>
            ) : (
              ""
            )}

            <div class="mt-6">
              <PrimaryButton
                classname="w-full px-6 py-3 tracking-wide capitalize flex justify-center "
                loader={loader}
                onclick={() => HandleSignup(otpInput)}
              >
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default OTPSignup;
