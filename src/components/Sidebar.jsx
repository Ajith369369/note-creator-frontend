import { AiFillHome } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { MdNoteAlt } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import notes_icon from "../assets/images/notes_icon.png";

function Sidebar() {
  const authFormState = useSelector((state) => state.auth);

  // Uses the useLocation hook to get the current location object. This object contains information about the current URL, which is useful for determining the active link.
  const location = useLocation();

  // Retrieves the current pathname from the location object and removes the leading slash. For example, /home becomes home.
  let pathname = location.pathname.replace("/", "");

  // JSX Return: Begins the JSX structure for rendering the component.
  return (
    <div className="fixed top-0 left-0 w-[60px] lg:w-sidebar bg-dark min-h-screen transition-all duration-100">
      <div className="flex flex-col py-3">
        <Link to="/" className="flex items-center justify-center p-3.5 border-b border-white/10">
          <img src={notes_icon} alt="" className="w-6" />
        </Link>

        <ul className="my-4 pl-0 list-none">
          {/* This will dynamically highlight the active link based on the current URL.
          Adds active-link class if the pathname is 'profile-home'.
           */}
          {authFormState.isAdminAuthenticated && (
            <Link
              to="/profile-home/admin"
              className={`text-white flex justify-center items-center h-10 transition-all duration-300 no-underline hover:bg-red-salsa lg:justify-start lg:pl-4 ${
                pathname === "profile-home/admin" ? "bg-red-salsa" : ""
              }`}
            >
              <span className="flex items-center justify-center">
                <RiAdminFill size={17} />
              </span>
              <span className="hidden lg:block ml-1.5 text-base font-light">Admin</span>
            </Link>
          )}
          <Link
            to="/profile-home/introduction"
            className={`text-white flex justify-center items-center h-10 transition-all duration-300 no-underline hover:bg-red-salsa lg:justify-start lg:pl-4 ${
              pathname === "profile-home/introduction" ? "bg-red-salsa" : ""
            }`}
          >
            <span className="flex items-center justify-center">
              <AiFillHome size={17} />
            </span>
            <span className="hidden lg:block ml-1.5 text-base font-light">Home</span>
          </Link>
          <Link
            to="/profile-home/add"
            className={`text-white flex justify-center items-center h-10 transition-all duration-300 no-underline hover:bg-red-salsa lg:justify-start lg:pl-4 ${
              pathname === "profile-home/add" ? "bg-red-salsa" : ""
            }`}
          >
            <span className="flex items-center justify-center">
              <BsPlusLg size={17} />
            </span>
            <span className="hidden lg:block ml-1.5 text-base font-light">Add</span>
          </Link>
          <Link
            to="/profile-home/notes"
            className={`text-white flex justify-center items-center h-10 transition-all duration-300 no-underline hover:bg-red-salsa lg:justify-start lg:pl-4 ${
              pathname === "profile-home/notes" ||
              pathname === "profile-home/note"
                ? "bg-red-salsa"
                : ""
            }`}
          >
            <span className="flex items-center justify-center">
              <MdNoteAlt size={17} />
            </span>
            <span className="hidden lg:block ml-1.5 text-base font-light">Notes</span>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
