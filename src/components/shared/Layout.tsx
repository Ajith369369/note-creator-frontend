import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { logout } from "@/redux/slices/authSlice";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Minimum loading time to prevent flickering on fast networks (500ms)
  const MIN_LOADING_TIME = 500;

  const existingUser = useMemo(() => {
    if (typeof window === "undefined") return null;
    const rawUser = sessionStorage.getItem("existingUser");
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser) as { username?: string } | null;
    } catch {
      return null;
    }
  }, []);

  const token = useMemo(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("token");
    }
    return null;
  }, []);

  const username = useMemo(() => {
    return existingUser?.username || "";
  }, [existingUser]);

  const date = useMemo(() => {
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString("default", { weekday: "long" });
    const month = currentDate.toLocaleString("default", { month: "long" });
    return `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  }, []);

  const greetText = useMemo(() => {
    if (!username) return "";
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour > 0 && currentHour < 12)
      return `Good Morning, ${username}!`;
    else if (currentHour === 12) return `Good Noon, ${username}!`;
    else if (currentHour > 12 && currentHour < 18)
      return `Good Afternoon, ${username}!`;
    else if (currentHour === 18 && currentHour < 21)
      return `Good Evening, ${username}!`;
    else return `Good Night, ${username}!`;
  }, [username]);

  const handleLogout = async () => {
    // Set loading state first
    setIsLoggingOut(true);

    // Use setTimeout to ensure React processes the state update and renders the spinner
    // before starting the logout logic
    await new Promise((resolve) => setTimeout(resolve, 0));

    const startTime = Date.now();

    try {
      // Clear auth (Outlet remains visible underneath spinner)
      sessionStorage.removeItem("existingUser");
      sessionStorage.removeItem("token");
      dispatch(logout());

      // Ensure minimum loading time to prevent flickering
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      // Navigate after spinner has been visible for at least MIN_LOADING_TIME
      navigate("/");
    } catch {
      // Handle any errors if needed
    } finally {
      // Reset loading state after navigation
      setTimeout(() => setIsLoggingOut(false), 300);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Sidebar />
      <div className="ml-[60px] lg:ml-sidebar w-[calc(100%-60px)] lg:w-[calc(100%-196px)] h-screen flex flex-col min-h-0">
        <Header
          greetText={greetText}
          date={date}
          token={token}
          handleLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
