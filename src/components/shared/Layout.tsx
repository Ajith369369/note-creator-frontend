import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import useAuthGuard from "@/hooks/useAuthGuard";
import { logout } from "@/redux/slices/authSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  // Check if user is authenticated
  useAuthGuard();

  const [token, setToken] = useState<string | null>(null);
  const [greetText, setGreetText] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingUser = useMemo(() => {
    const rawUser = sessionStorage.getItem("existingUser");
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser) as { username?: string } | null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    if (existingUser?.username) {
      setUsername(existingUser.username);
    }
  }, [existingUser]);

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString("default", { weekday: "long" });
    const month = currentDate.toLocaleString("default", { month: "long" });
    setDate(
      `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
    );

    const currentHour = currentDate.getHours();
    if (currentHour > 0 && currentHour < 12)
      setGreetText(`Good Morning, ${username}!`);
    else if (currentHour === 12) setGreetText(`Good Noon, ${username}!`);
    else if (currentHour > 12 && currentHour < 18)
      setGreetText(`Good Afternoon, ${username}!`);
    else if (currentHour === 18 && currentHour < 21)
      setGreetText(`Good Evening, ${username}!`);
    else setGreetText(`Good Night, ${username}!`);
  }, [username]);

  const handleLogout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Sidebar />
      <div className="ml-[60px] lg:ml-sidebar w-[calc(100%-60px)] lg:w-[calc(100%-196px)] min-h-screen overflow-y-scroll">
        <Header
          greetText={greetText}
          date={date}
          token={token}
          handleLogout={handleLogout}
        />
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
