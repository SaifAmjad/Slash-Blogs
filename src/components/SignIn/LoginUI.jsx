import React from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const LoginUI = ({
  login,
  loader,
  onChangeLogin,
  LogInHandler,
  onSuccessLogin,
  disable,
}) => {
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
              sign In
            </h1>

            <div class="relative flex items-center mt-8">
              <span class="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                name="email"
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-300 dark:border-gray-600 focus:border-gray-700 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
                value={login.email}
                onChange={onChangeLogin}
              />
            </div>

            <div class="relative flex items-center mt-4">
              <span class="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                name="password"
                class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-gray-700 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                value={login.password}
                onChange={onChangeLogin}
              />
            </div>

            <div class="mt-6">
              <PrimaryButton
                disabled={
                  (login.email.length > 0 && login.password.length > 0) ||
                  !disable
                    ? false
                    : true
                }
                loader={loader}
                classname="w-full px-6 py-3 tracking-wide capitalize flex justify-center "
                onclick={LogInHandler}
              >
                Sign in
              </PrimaryButton>

              <p class="mt-4 mb-4 text-center text-gray-600 dark:text-gray-400">
                or
              </p>

              <div className="flex w-full justify-center items-center">
                <GoogleLogin
                  onSuccess={onSuccessLogin}
                  onError={() => {
                    alert("Login Failed");
                  }}
                />
              </div>

              <div class="mt-6 text-center ">
                <Link
                  to={"/signup"}
                  class="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginUI;
