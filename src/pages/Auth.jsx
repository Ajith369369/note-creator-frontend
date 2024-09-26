import { faArrowLeft, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_USER } from "../admin/constants";
import loginImage from "../assets/images/note-creator-round-logo.png";
import { loginAdmin, loginUser } from "../redux/slices/authSlice";
import { loginApi, registerApi } from "../services/nc_allApi";
import "./Auth.scss";

function Auth({ register }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateData = (e) => {
    const { name, value } = e.target;
    console.log('name, value: ', name, value)

    if (name === "Username") {
      if (value === "") {
        // If the input is empty, reset the validation to true
        handleChange("is_passenger_name", true);
      } else if (!/^[A-Za-z]+$/.test(value)) {
        // If the input contains invalid characters, set validation to false
        handleChange("is_passenger_name", false);
      } else {
        // If the input is valid, set validation to true
        handleChange("is_passenger_name", true);
      }
    
  };

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info("Please fill the form completely.");
    } else {
      const result = await registerApi(userDetails);
      console.log(result);
      if (result.status == 200) {
        toast.success("Registration successful!");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error("Something went wrong.");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
    }
  };
  console.log(userDetails);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info("Please fill the form completely.");
    } else {
      const result = await loginApi({ email, password });
      console.log(result);

      if (result.status == 200) {
        if (email == ADMIN_USER.email && password == ADMIN_USER.password) {
          setUserDetails({ username: "", email: "", password: "" });
          sessionStorage.setItem(
            "existingUser",
            JSON.stringify(result.data.existingUser)
          );

          // Token was already a string when received.
          sessionStorage.setItem("token", result.data.token);
          // dispatch(updateAdminFormState({ loginAdmin: true }));
          dispatch(loginAdmin());
          toast.success("Administrator Login successful", {
            onClose: () => navigate("/profile-home/admin"),
          });
        } else {
          setUserDetails({ username: "", email: "", password: "" });
          sessionStorage.setItem(
            "existingUser",
            JSON.stringify(result.data.existingUser)
          );

          // Token was already a string when received.
          sessionStorage.setItem("token", result.data.token);
          dispatch(loginUser());
          toast.success("User Login successful", {
            onClose: () => navigate("/"),
          });
        }
      } else {
        toast.error("Something went wrong.");
        setUserDetails({ username: "", email: "", password: "" });
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center bg-success"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="container w-75">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h4 className="btn btn-outline-light m-0 p-2">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back Home
            </h4>
          </Link>

          <div className="bg-success p-3">
            <Row>
              <Col
                md={6}
                className="p-4 d-flex justify-content-center align-items-center"
              >
                <img src={loginImage} alt="" width={"80%"} />
              </Col>
              <Col
                md={6}
                className="p-5 d-flex flex-column justify-content-center text-light"
              >
                <form className="w-100">
                  <h4 className="text-center text-light">
                    <FontAwesomeIcon icon={faBookOpen} className="fa-2x me-2" />
                    Note Creator
                  </h4>
                  {register ? (
                    <h5 className="text-center">Sign Up to Your Account</h5>
                  ) : (
                    <h5 className="text-center">Sign In to Your Account</h5>
                  )}
                  {register && (
                    <div className="mb-3">
                      <input
                        type="text"
                        name="Username"
                        placeholder="Username"
                        className="form-control rounded-0"
                        value={userDetails.username}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="text"
                      name="Email"
                      placeholder="Email ID"
                      className="form-control rounded-0"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="Password"
                      placeholder="Password"
                      className="form-control rounded-0"
                      value={userDetails.password}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    {register ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-warning w-100 rounded-0"
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                        <p className="mt-2">
                          Already a User? Click Here to{" "}
                          <Link to={"/login"} className="text-warning">
                            Login
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="btn btn-warning w-100 rounded-0"
                        >
                          Login
                        </button>
                        <p className="mt-2">
                          New User? Click Here to{" "}
                          <Link to={"/register"} className="text-warning">
                            Register
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
        <ToastContainer
          autoClose={2000}
          theme="colored"
          position="top-center"
        />
      </div>
    </>
  );
}

export default Auth;
