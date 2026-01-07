import { ADMIN_USER } from "@/admin/constants";
import headerImg from "@/assets/images/header_img.jpg";
import loginImage from "@/assets/images/note-creator-round-logo.png";
import TestCredentials from "@/components/shared/TestCredentials";
import { loginAdmin, loginUser } from "@/redux/slices/authSlice";
import { loginApi, registerApi } from "@/services/api";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ChangeEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AuthProps = {
  register?: boolean;
};

type UserDetails = {
  username: string;
  email: string;
  password: string;
  is_username: boolean;
  is_email: boolean;
  is_password: boolean;
};

const defaultUserDetails: UserDetails = {
  username: "",
  email: "",
  password: "",
  is_username: true,
  is_email: true,
  is_password: true,
};

function Auth({ register }: AuthProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] =
    useState<UserDetails>(defaultUserDetails);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = <K extends keyof UserDetails>(
    name: K,
    value: UserDetails[K]
  ) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "Username") {
      if (value === "") {
        handleChange("is_username", true);
        handleChange("username", value);
      } else if (!/^[A-Za-z]+$/.test(value)) {
        handleChange("is_username", false);
        handleChange("username", value);
      } else {
        handleChange("is_username", true);
        handleChange("username", value);
      }
    } else if (name === "Email") {
      if (value === "") {
        handleChange("is_email", true);
        handleChange("email", value);
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        handleChange("is_email", false);
        handleChange("email", value);
      } else {
        handleChange("is_email", true);
        handleChange("email", value);
      }
    } else {
      if (value === "") {
        handleChange("is_password", true);
        handleChange("password", value);
      } else if (!/^[A-Za-z0-9]+$/.test(value)) {
        handleChange("is_password", false);
        handleChange("password", value);
      } else {
        handleChange("is_password", true);
        handleChange("password", value);
      }
    }
  };

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info("Please fill the form completely.");
    } else {
      const result = await registerApi(userDetails);
      if (result.status === 200) {
        toast.success("Registration successful!");
        setUserDetails(defaultUserDetails);
        navigate("/login");
      } else {
        toast.error("Something went wrong.");
        setUserDetails(defaultUserDetails);
      }
    }
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info("Please fill the form completely.");
    } else {
      const result = await loginApi({ email, password });

      if (result.status === 200) {
        setUserDetails(defaultUserDetails);
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
          dispatch(loginAdmin());
          toast.success("Administrator Login successful", {
            onClose: () => navigate("/profile-home/admin"),
          });
        } else {
          dispatch(loginUser());
          toast.success("User Login successful", {
            onClose: () => navigate("/"),
          });
        }
      } else {
        toast.error("Something went wrong.");
        setUserDetails(defaultUserDetails);
      }
    }
  };

  return (
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

      <div className="relative z-10 w-full max-w-8xl px-6 md:px-5 py-5">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start bg-white/5 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 md:p-5">
          {/* Test Credentials - Left side on desktop, top on mobile */}
          <div className="order-1 lg:order-1">
            <TestCredentials isMobile={isMobile} />
          </div>

          {/* Form Section - Middle on desktop, second on mobile */}
          <div className="order-2 lg:order-2 space-y-6 text-white p-5 w-full h-full flex flex-col justify-center items-center">
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

            <form className="space-y-4 text-slate-900 w-full">
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
                      onChange={validateData}
                    />
                  </div>
                  {userDetails.is_username === false && (
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
                    onChange={validateData}
                  />
                </div>
                {userDetails.is_email === false && (
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
                    onChange={validateData}
                  />
                </div>
                {userDetails.is_password === false && (
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

          {/* Image Section - Right side on desktop, third on mobile */}
          <div className="order-3 lg:order-3 w-full h-full flex justify-center items-center">
            <div className="relative w-full h-full max-w-sm">
              <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 blur-3xl opacity-30 animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/10 shadow-2xl shadow-emerald-500/20 backdrop-blur-2xl p-6 h-full flex flex-col justify-center items-center">
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
        <ToastContainer
          autoClose={2000}
          theme="colored"
          position="top-center"
        />
      </div>
    </div>
  );
}

export default Auth;
