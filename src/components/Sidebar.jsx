import PropTypes from "prop-types";
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
    <aside className="fixed top-0 left-0 w-[60px] lg:w-sidebar min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl shadow-slate-900/60 border-r border-white/5 backdrop-blur-xl">
      <div className="flex flex-col py-4 h-full">
        <Link
          to="/"
          className="mx-2 mb-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-all duration-300 shadow-inner shadow-black/30"
        >
          <img src={notes_icon} alt="" className="w-6 drop-shadow" />
        </Link>

        <ul className="flex-1 space-y-2 px-2 list-none">
          {authFormState.isAdminAuthenticated && (
            <NavItem
              to="/profile-home/admin"
              icon={<RiAdminFill size={18} />}
              label="Admin"
              active={pathname === "profile-home/admin"}
            />
          )}
          <NavItem
            to="/profile-home/introduction"
            icon={<AiFillHome size={18} />}
            label="Home"
            active={pathname === "profile-home/introduction"}
          />
          <NavItem
            to="/profile-home/add"
            icon={<BsPlusLg size={16} />}
            label="Add"
            active={pathname === "profile-home/add"}
          />
          <NavItem
            to="/profile-home/notes"
            icon={<MdNoteAlt size={18} />}
            label="Notes"
            active={
              pathname === "profile-home/notes" ||
              pathname === "profile-home/note"
            }
          />
        </ul>

        <div className="mt-auto px-3 pb-3 text-[11px] text-white/60 hidden lg:block">
          <div className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 backdrop-blur">
            <p className="font-semibold text-white/80">Note Creator</p>
            <p className="text-white/60">Stay organized, stay creative.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-3 h-11 px-3 rounded-xl no-underline transition-all duration-300 border border-transparent ${
        active
          ? "bg-red-salsa/90 border-red-salsa/40 shadow-[0_10px_30px_-12px_rgba(251,54,64,0.8)]"
          : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10"
      }`}
    >
      <span
        className={`absolute left-1 top-1/2 -translate-y-1/2 h-7 w-1 rounded-full transition-all duration-300 ${
          active ? "bg-white/90" : "bg-white/10 group-hover:bg-white/40"
        }`}
      />
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-lg ${
          active ? "bg-white/15 text-white" : "bg-white/5 text-white/80"
        }`}
      >
        {icon}
      </span>
      <span
        className={`hidden lg:block text-sm font-medium transition-colors duration-300 ${
          active ? "text-white" : "text-white/80 group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Sidebar;
