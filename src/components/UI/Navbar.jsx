import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("authToken"));

  const navigate = useNavigate();

  const logout = () => {
    console.log('click');
    
    Cookies.remove("authToken");
    setToken("");
    navigate("/");
  };

  return (
    <div>
      <nav class="relative bg-white dark:bg-gray-800">
        <div class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div class="flex items-center justify-between">
            <a href="#" className="flex items-center">
              <img
                class="h-9"
                src="https://img.freepik.com/premium-photo/credit-card-laptop-computer_956369-6948.jpg?w=740"
                alt=""
              />
              <h2 className="font-bold text-3xl">Slash</h2>
            </a>

            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {/* Hamburger Icon */}
                {!isOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}

                {/* Close Icon */}
                {isOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            x-cloak:class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']"
            class="hidden sm:block absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center"
          >
            <div class="flex flex-col md:flex-row md:mx-6 font-semibold">
              <Link
                class="my-2  transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/"
              >
                Home
              </Link>
              <Link
                class="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/myblogs"
              >
                My blogs
              </Link>
              <Link
                class="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/writeblog"
              >
                Write blog
              </Link>
              <a
                class="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#footer"
              >
                About
              </a>
            </div>
          </div>

          <div class="hidden sm:flex items-center gap-x-4">
            {token ? (
              <>
                <PrimaryButton onclick={logout}>Logout</PrimaryButton>
              </>
            ) : (
              <>
                <Link
                  to={"/signin"}
                  className="font-bold cursor-pointer hover:text-black/60"
                >
                  Log in
                </Link>
                <div>
                  <Link to="/signup">
                    <PrimaryButton>Sign Up</PrimaryButton>
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="sm:hidden block">
            <div
              className={`sm:hidden absolute z-30 inset-x-0 w-full px-6 py-4 
    bg-white  
     
    transition-all duration-300 ease-in-out
    ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <div className="sm:hidden ml-1 mb-2 flex flex-col font-semibold">
                <Link
                  className="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/myblogs"
                >
                  My blogs
                </Link>
                <Link
                  className="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/writeblog"
                >
                  Write blog
                </Link>
                <a
                  className="my-2 transition-colors duration-300 transform dark:text-gray-200 hover:text-black/60 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  href="#footer"
                >
                  About
                </a>
              </div>

              <div
                className={`sm:hidden flex gap-x-3 justify-end items-center
                 
`}
              >
                {token ? (
                  <div>
                 
                  <PrimaryButton onclick={logout}>Logout</PrimaryButton>
                  </div>
                  
                ) : (
                  <>
                    <Link
                      to={"/signin"}
                      className="font-bold cursor-pointer hover:text-black/60"
                    >
                      Log in
                    </Link>
                    <div>
                      <Link to="/signup">
                        <PrimaryButton>Sign Up</PrimaryButton>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
