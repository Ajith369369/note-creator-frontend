import { ADMIN_USER } from "@/admin/constants";
import headerImg from "@/assets/images/header_img.jpg";
import loginImage from "@/assets/images/note-creator-round-logo.png";
import { loginAdmin, loginUser } from "@/redux/slices/authSlice";
import { loginApi, registerApi } from "@/services/nc_allApi";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Ambient gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.16),transparent_35%)]" />
        {/* Soft background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url(${headerImg})`,
          }}
        />

        <div className="relative z-10 w-full max-w-6xl px-6 md:px-10 py-10">
          <div className="flex justify-between items-center mb-6">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white border border-white/30 rounded-full bg-white/5 hover:bg-white/10 transition shadow-lg shadow-white/10"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
              Back Home
            </Link>
            <div className="hidden md:flex items-center gap-2 text-slate-200/80 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Secure authentication
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 md:p-10">
            <div className="order-2 md:order-1 space-y-6 text-white">
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-emerald-100 bg-emerald-500/20 border border-emerald-200/40 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  {register ? "Create your space" : "Welcome back"}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                  {register ? "Join Note Creator" : "Sign in to Note Creator"}
                </h1>
                <p className="text-slate-200/80 text-base">
                  Effortlessly capture, organize, and sync your notes with a
                  clean, focused experience.
                </p>
              </div>

              <form className="space-y-4 text-slate-900">
                {register && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="Username"
                        placeholder="johndoe"
                        className="w-full px-4 py-3 rounded-xl bg-white/90 text-slate-900 border border-white/40 shadow-inner shadow-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition"
                        value={userDetails.username}
                        onChange={(e) => validateData(e)}
                      />
                    </div>
                    {userDetails.is_username == false && (
                      <p className="text-sm text-rose-300 font-semibold">
                        *Invalid username
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="Email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 text-slate-900 border border-white/40 shadow-inner shadow-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition"
                      value={userDetails.email}
                      onChange={(e) => validateData(e)}
                    />
                  </div>
                  {userDetails.is_email == false && (
                    <p className="text-sm text-rose-300 font-semibold">
                      *Invalid email
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="Password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 text-slate-900 border border-white/40 shadow-inner shadow-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition"
                      value={userDetails.password}
                      onChange={(e) => validateData(e)}
                    />
                  </div>
                  {userDetails.is_password == false && (
                    <p className="text-sm text-rose-300 font-semibold">
                      *Only letters and numbers
                    </p>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  {register ? (
                    <>
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-emerald-900 font-semibold shadow-lg shadow-emerald-400/40 hover:shadow-emerald-400/60 hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={handleRegister}
                        disabled={
                          !userDetails.is_username ||
                          !userDetails.is_email ||
                          !userDetails.is_password
                        }
                      >
                        Create Account
                      </button>
                      <p className="text-sm text-slate-200/90 text-center">
                        Already have an account?{" "}
                        <Link
                          to={"/login"}
                          className="font-semibold text-emerald-200 hover:text-emerald-100 underline"
                        >
                          Log in
                        </Link>
                      </p>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-emerald-900 font-semibold shadow-lg shadow-emerald-400/40 hover:shadow-emerald-400/60 hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={
                          !userDetails.is_email || !userDetails.is_password
                        }
                      >
                        Sign In
                      </button>
                      <p className="text-sm text-slate-200/90 text-center">
                        New here?{" "}
                        <Link
                          to={"/register"}
                          className="font-semibold text-emerald-200 hover:text-emerald-100 underline"
                        >
                          Create an account
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </form>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 blur-3xl opacity-30 animate-pulse" />
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/10 shadow-2xl shadow-emerald-500/20 backdrop-blur-2xl p-6">
                  <img
                    src={loginImage}
                    alt="Note Creator"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                  <div className="mt-4 text-center space-y-2 text-emerald-50">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/80">
                      Beautifully minimal
                    </p>
                    <p className="text-base text-white/90">
                      Keep every note clean, organized, and instantly accessible
                      across devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

Auth.propTypes = {
  register: PropTypes.bool,
};
