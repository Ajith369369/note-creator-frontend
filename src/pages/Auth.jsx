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

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    is_username: true,
    is_email: true,
    is_password: true,
  });

  // #region Multi-line Comment
  /**
   * handleChange Function: This function updates the state based on the name and value parameters.
   * When you use ...prevState in the context of updating state in React, it is typically used to preserve the existing state values while updating or adding new values.
   * ...prevState ensures that all previous state properties are included in the new state object.
   * [name]: value updates or adds the property corresponding to name with the new value.
   */
  // #endregion
  const handleChange = (name, value) => {
    setUserDetails((prevState) => ({
      // Copy all the existing state properties
      ...prevState,

      // #region Multi-line Comment
      /**
       * Update the specific property.
       * The name parameter is used as a dynamic key to update the corresponding property in the state.
       * This is possible due to the square bracket notation [name], which allows you to dynamically update the state key based on the value of name.
       */
      // #endregion
      [name]: value,
    }));
  };

  const validateData = (e) => {
    const { name, value } = e.target;
    console.log("name, value: ", name, value);

    if (name === "Username") {
      if (value === "") {
        // If the input is empty, reset the validation to true
        handleChange("is_username", true);
        handleChange("username", value);
      } else if (!/^[A-Za-z]+$/.test(value)) {
        // If the input contains invalid characters, set validation to false
        handleChange("is_username", false);
        handleChange("username", value);
      } else {
        // If the input is valid, set validation to true
        handleChange("is_username", true);
        handleChange("username", value);
      }

      // #region Multi-line Comment
      /**
       * Regular expression to check for a valid email format.
       * john@gmail.com
       *
       * ^: This asserts the start of the string. Ensures that the match begins right from the start of the input, with no preceding characters.
       *
       * [^\s@]+:
       * [ and ]: Defines a character class, which matches any one of the characters contained within it.
       * \s: Matches any whitespace character (like spaces, tabs, etc.).
       * @: Matches the "@" character specifically.
       * ^ inside [ and ]: When used inside a character class, it negates the class, meaning it matches any character except those specified.
       * [^\s@]+: It matches a sequence of one or more characters that are not whitespace and not the "@" symbol.
       * + symbol: It is a quantifier that specifies that the preceding element must appear one or more times. This means that the pattern before the + must occur at least once but can repeat any number of times, including indefinitely.
       * E.g., john
       *
       * @: Matches the "@" character specifically.
       * [^\s@]+ (again): Matches one or more characters after the "@" symbol that are not whitespace and not "@".
       * E.g., gmail
       *
       * \.: Matches a literal period '.' Ensures that there's a period in the domain part of the email, which is standard in most email formats (like example.com).
       * [^\s@]+ (again): Matches one or more characters after the period, which typically represents the top-level domain (like com, org, etc.).
       * E.g., com
       *
       * $: Asserts the end of the string. Ensures that the match extends to the end of the input, with no trailing characters.
       *
       * This pattern is designed to catch most common email formats, ensuring that the input looks like a valid email address (e.g., user@example.com).
       * However, it may not catch every edge case or allow every valid email according to the full specification.
       * When a user types just a single letter or number, it fails the emailPattern.test(value) check because it's not yet a valid email address. So, proper validation happens only after typing the entire email address.
       */
      // #endregion
    } else if (name === "Email") {
      if (value === "") {
        // If the input is empty, reset the validation to true
        handleChange("is_email", true);
        handleChange("email", value);
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        // If the input contains invalid characters, set validation to false
        handleChange("is_email", false);
        handleChange("email", value);
      } else {
        // If the input is valid, set validation to true
        handleChange("is_email", true);
        handleChange("email", value);
      }
    } else {
      if (value === "") {
        // If the input is empty, reset the validation to true
        handleChange("is_password", true);
        handleChange("password", value);
      } else if (!/^[A-Za-z0-9]+$/.test(value)) {
        // If the input contains invalid characters, set validation to false
        handleChange("is_password", false);
        handleChange("password", value);
      } else {
        // If the input is valid, set validation to true
        handleChange("is_password", true);
        handleChange("password", value);
      }
    }
    // #region Multi-line Comment
    /**
     * onChange={(e) =>
          setUserDetails({
            ...userDetails,
            username: e.target.value,
          })
        }
      */
    // #endregion
  };

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
        <div className="container w-75 py-4">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h4 className="btn btn-outline-light m-0 p-2">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back Home
            </h4>
          </Link>

          <div className="p-3">
            <Row>
              <Col
                md={6}
                className="p-4 d-flex justify-content-center align-items-center"
              >
                <img src={loginImage} alt="" width={"80%"} />
              </Col>
              <Col
                md={6}
                className="p-5 d-flex flex-column justify-content-center text-dark"
              >
                <form className="w-100">
                  <h4 className="text-center text-dark">
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
                        onChange={(e) => validateData(e)}
                      />
                      {userDetails.is_username == false && (
                        <p className="err-text text-danger fw-bold me-auto p-2">
                          *Invalid Input
                        </p>
                      )}
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="text"
                      name="Email"
                      placeholder="Email ID"
                      className="form-control rounded-0"
                      value={userDetails.email}
                      onChange={(e) => validateData(e)}
                    />
                    {userDetails.is_email == false && (
                      <p className="err-text text-danger fw-bold me-auto p-2">
                        *Invalid Input
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="Password"
                      placeholder="Password"
                      className="form-control rounded-0"
                      value={userDetails.password}
                      onChange={(e) => validateData(e)}
                    />
                    {userDetails.is_password == false && (
                      <p className="err-text text-danger fw-bold me-auto p-2">
                        *Invalid Input
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    {register ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-warning w-100 rounded-0"
                          onClick={handleRegister}
                          disabled={
                            !userDetails.is_username ||
                            !userDetails.is_email ||
                            !userDetails.is_password
                          }
                        >
                          Register
                        </button>
                        <p className="mt-2">
                          Already a User? Click Here to{" "}
                          <Link to={"/login"} className="fw-bold">
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
                          disabled={
                            !userDetails.is_email || !userDetails.is_password
                          }
                        >
                          Login
                        </button>
                        <p className="mt-2">
                          New User? Click Here to{" "}
                          <Link to={"/register"} className="fw-bold">
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
