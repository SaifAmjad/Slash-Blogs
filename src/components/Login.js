import React, { useContext, useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BlogContext from "../context/BlogContext";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login({ setHide }) {
  const tab = useParams();
  const navigate = useNavigate();
  const closeRef = useRef();
  const loginRef = useRef(null);
  const singupRef = useRef(null);

  const context = useContext(BlogContext);
  const { blogs, host } = context;

  const [justifyActive, setJustifyActive] = useState(tab.tab);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignUp] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const onChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onChangeSignUp = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };

  const LogIn = async () => {
    if (!login.email || !login.password) {
      alert("Empty input fields");
      return;
    }

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
        setOtp(dataValue.otp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SignUp = async (e) => {
    if (!signup.email || !signup.password || !signup.name) {
      alert("Empty input fields");
      return;
    }

    if (signup.password.length < 5) {
      alert("Password field must contain characters of minimum length 5");
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
        console.log("In otp");
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
        setOtp(dataValue.otp);
      } else {
        alert("User already exist with this email");
        navigate("/login/tab2");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleLogin = async () => {
    try {
      if (otp === Number(otpInput)) {
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
          closeRef.current.click();
          setHide(false);
          navigate("/");
        } else {
  
          alert(dataValue.msg);
        }
      } else {
        alert("Incorrect OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSignup = async () => {
    try {
      if (otp === Number(otpInput)) {
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
            closeRef.current.click();
            setHide(false);
            navigate("/");
          }
        }
      } else {
        alert("Incorrect OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessLogin = async (res) => {
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
        loginRef.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessSignup = async (res) => {
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
      setSignUp((prev) => ({
        name: data.name,
        email: data.email,
        password: "112233",
      }));

      if (data.success) {
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
          setOtp(dataValue.otp);
          setSignUp((prev) => ({
            name: data.name,
            email: data.email,
            password: "112233",
          }));
          singupRef.current.click();
        } else {
          alert(userData.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setJustifyActive(tab.tab);
    setHide(true);
  }, []);

  const handleCloseClick = () => {
    setHide(false);
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    console.log(justifyActive);
    setJustifyActive(value);
  };

  return (
    <div className="container">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                OTP sent to your email
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Enter your OTP here:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                ref={closeRef}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                onClick={justifyActive === "tab1" ? HandleLogin : HandleSignup}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <MDBContainer className="row pt-4 mt-5 justify-content-center border custom-login-mainDiv">
        <div className="row">
          <Link
            to={"/"}
            onClick={handleCloseClick}
            type="button"
            class="btn-close me-5"
            aria-label="Close"
          ></Link>
        </div>

        <div className="col-5">
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBTabsItem>
              <button
                className="btn btn-success w-75"
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === "tab1"}
              >
                Login
              </button>
            </MDBTabsItem>
            <MDBTabsItem>
              <button
                className="btn btn-success w-75"
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </button>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            {justifyActive === "tab1" ? (
              <div>
                <div className="text-center">
                  <p>Log in with:</p>

                  <div
                    className="d-flex justify-content-center mx-auto"
                    style={{ width: "40%" }}
                  >
                    <GoogleLogin
                      onSuccess={onSuccessLogin}
                      onError={() => {
                        alert("Login Failed");
                      }}
                    />
                  </div>

                  <p className="text-center mt-2">or</p>
                </div>

                <MDBInput
                  wrapperClass="mb-2"
                  label="Email address"
                  id="email"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={onChangeLogin}
                  required
                />
                <MDBInput
                  wrapperClass="mb-2"
                  label="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={onChangeLogin}
                  required
                />

                <div className="d-flex justify-content-end mx-1 mb-3">
                  <a href="!#" className="text-success">
                    Forgot password?
                  </a>
                </div>

                <button
                  className="btn btn-success mb-3 w-100"
                  onClick={LogIn}
                  data-bs-toggle={login.email && login.password ? "modal" : ""}
                  data-bs-target="#exampleModal"
                >
                  Log in
                </button>
                <button
                  ref={loginRef}
                  className="btn btn-success mb-3 w-100 d-none"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Log in
                </button>
                <p className="text-center">
                  Not a member?{" "}
                  <a
                    href="#!"
                    className="text-success"
                    onClick={() => handleJustifyClick("tab2")}
                  >
                    Register
                  </a>
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <p>Sign up with:</p>

                  <div
                    className="d-flex justify-content-center mx-auto"
                    style={{ width: "40%" }}
                  >
                    <GoogleLogin
                      onSuccess={onSuccessSignup}
                      onError={() => {
                        alert("Login Failed");
                      }}
                    />
                  </div>

                  <p className="text-center mt-1">or</p>
                </div>

                <MDBInput
                  wrapperClass="mb-2"
                  label="Name"
                  id="name"
                  type="text"
                  name="name"
                  value={signup.name}
                  onChange={onChangeSignUp}
                  required
                />
                <MDBInput
                  wrapperClass="mb-2"
                  label="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={onChangeSignUp}
                  required
                />
                <MDBInput
                  wrapperClass="mb-2"
                  label="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={signup.password}
                  onChange={onChangeSignUp}
                  required
                />

                <button
                  className="btn btn-success mb-4 w-100"
                  onClick={SignUp}
                  data-bs-toggle={
                    signup.name && signup.email && signup.password
                      ? "modal"
                      : ""
                  }
                  data-bs-target="#exampleModal"
                >
                  Sign up
                </button>

                <button
                  className="btn btn-success mb-4 w-100 d-none"
                  ref={singupRef}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Sign up
                </button>
              </div>
            )}
          </MDBTabsContent>
        </div>
      </MDBContainer>
    </div>
  );
}

export default Login;
