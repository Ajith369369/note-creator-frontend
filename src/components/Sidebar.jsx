import { AiFillHome } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { MdNoteAlt } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import notes_icon from "../assets/images/notes_icon.png";
import "./Sidebar.scss";

function Sidebar() {
  const authFormState = useSelector((state) => state.auth);

  // Uses the useLocation hook to get the current location object. This object contains information about the current URL, which is useful for determining the active link.
  const location = useLocation();

  // Retrieves the current pathname from the location object and removes the leading slash. For example, /home becomes home.
  let pathname = location.pathname.replace("/", "");

  // JSX Return: Begins the JSX structure for rendering the component.
  return (
    {
      /* This is a sidebar with navigation links, dynamically highlighting the active link based on the current URL.
       */
    },
    (
      <div className="app-sidebar">
        <div className="sidebar-content py-3 flex flex-column">
          <Link to="/" className="app-brand flex align-center justify-center">
            <img src={notes_icon} alt="" />
          </Link>

          <ul className="links my-4">
            {/* This will dynamically highlight the active link based on the current URL.
            Adds active-link class if the pathname is 'profile-home'.
            className={`text-white flex justify-center align-center link-item ${
                pathname === "profile-home/admin" ? "active-link" : ""
              }`}
             */}
            {authFormState.isAdminAuthenticated && (
              <Link
                to="/profile-home/admin"
                className={`text-white flex justify-center align-center link-item ${
                  pathname === "profile-home/admin" ? "active-link" : ""
                }`}
              >
                <span className="flex align-center justify-center">
                  <RiAdminFill size={17} />
                </span>
                <span className="icon-text">Admin</span>
              </Link>
            )}
            <Link
              to="/profile-home/introduction"
              className={`text-white flex justify-center align-center link-item ${
                pathname === "profile-home/introduction" ? "active-link" : ""
              }`}
            >
              <span className="flex align-center justify-center">
                <AiFillHome size={17} />
              </span>
              <span className="icon-text">Home</span>
            </Link>
            <Link
              to="/profile-home/add"
              className={`text-white flex justify-center align-center link-item ${
                pathname === "profile-home/add" ? "active-link" : ""
              }`}
            >
              <span className="flex align-center justify-center">
                <BsPlusLg size={17} />
              </span>
              <span className="icon-text">Add</span>
            </Link>
            <Link
              to="/profile-home/notes"
              className={`text-white flex justify-center align-center link-item ${
                pathname === "profile-home/notes" ||
                pathname === "profile-home/note"
                  ? "active-link"
                  : ""
              }`}
            >
              <span className="flex align-center justify-center">
                <MdNoteAlt size={17} />
              </span>
              <span className="icon-text">Notes</span>
            </Link>
          </ul>
        </div>
      </div>
    )
  );
}

export default Sidebar;
