import Header from "@/components/shared/Header";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Sidebar from "@/components/shared/Sidebar";
import useAuthGuard from "@/hooks/useAuthGuard";
import { logout } from "@/redux/slices/authSlice";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  // Check if user is authenticated
  useAuthGuard();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    setIsLoggingOut(true);

    // Navigate FIRST, before clearing auth to avoid race condition with useAuthGuard

    // Small delay to ensure navigation starts before clearing auth
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Then clear auth (useAuthGuard will see we're already on public route)
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/");

    // Reset loading state after navigation completes
    setTimeout(() => setIsLoggingOut(false), 300);
  };

  return (
    <>
      {isLoggingOut && (
        <LoadingSpinner
          title="Logging out..."
          subtitle="Please wait while we sign you out"
          spinnerColor="border-amber-400"
          bgColor="bg-slate-950"
          bgOpacity="bg-opacity-50"
        />
      )}
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
    </>
  );
}

export default Layout;
