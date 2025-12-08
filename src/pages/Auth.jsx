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
        className="flex justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/src/assets/images/header_img.jpg')" }}
      >
        <div className="container w-11/12 md:w-3/4 py-4 bg-white/10 backdrop-blur-[30px] border-2 border-white/20 rounded-2xl">
          <Link to={"/"} className="no-underline">
            <h4 className="btn btn-outline-light m-0 p-2 text-base text-black border-gray-300 hover:border-black">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back Home
            </h4>
          </Link>

          <div className="p-3">
            <Row>
              <Col
                md={6}
                className="p-4 flex justify-center items-center"
              >
                <img src={loginImage} alt="" className="w-4/5" />
              </Col>
              <Col
                md={6}
                className="p-5 flex flex-col justify-center text-dark"
              >
                <form className="w-full text-base">
                  <h4 className="text-center text-dark text-xl">
                    <FontAwesomeIcon icon={faBookOpen} className="text-3xl me-2" />
                    Note Creator
                  </h4>
                  {register ? (
                    <h5 className="text-center text-lg">Sign Up to Your Account</h5>
                  ) : (
                    <h5 className="text-center text-lg">Sign In to Your Account</h5>
                  )}

                  {register && (
                    <div className="mb-3">
                      <input
                        type="text"
                        name="Username"
                        placeholder="Username"
                        className="w-full px-3 py-2 text-base border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-salsa"
                        value={userDetails.username}
                        onChange={(e) => validateData(e)}
                      />
                      {userDetails.is_username == false && (
                        <p className="text-base text-red-600 font-bold ml-auto p-2">
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
                      className="w-full px-3 py-2 text-base border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-salsa"
                      value={userDetails.email}
                      onChange={(e) => validateData(e)}
                    />
                    {userDetails.is_email == false && (
                      <p className="text-base text-red-600 font-bold ml-auto p-2">
                        *Invalid Input
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="Password"
                      placeholder="Password"
                      className="w-full px-3 py-2 text-base border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-salsa"
                      value={userDetails.password}
                      onChange={(e) => validateData(e)}
                    />
                    {userDetails.is_password == false && (
                      <p className="text-base text-red-600 font-bold ml-auto p-2">
                        *Invalid Input
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    {register ? (
                      <div>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base bg-yellow-500 text-black rounded-none border border-yellow-500 hover:bg-yellow-600 disabled:text-gray-400 disabled:bg-transparent disabled:border-gray-400 disabled:cursor-not-allowed"
                          onClick={handleRegister}
                          disabled={
                            !userDetails.is_username ||
                            !userDetails.is_email ||
                            !userDetails.is_password
                          }
                        >
                          Register
                        </button>
                        <p className="mt-2 text-base">
                          Already a User? Click Here to{" "}
                          <Link to={"/login"} className="font-bold text-blue-600">
                            Login
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="w-full px-4 py-2 text-base bg-yellow-500 text-black rounded-none border border-yellow-500 hover:bg-yellow-600 disabled:text-gray-400 disabled:bg-transparent disabled:border-gray-400 disabled:cursor-not-allowed"
                          disabled={
                            !userDetails.is_email || !userDetails.is_password
                          }
                        >
                          Login
                        </button>
                        <p className="mt-2 text-base">
                          New User? Click Here to{" "}
                          <Link to={"/register"} className="font-bold text-blue-600">
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
