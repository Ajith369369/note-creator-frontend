import headerImg from "@/assets/images/header_img.jpg";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Header({ greetText, date, token, handleLogout }) {
  return (
    <header
      className="relative w-full min-h-[72px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url(${headerImg})`,
      }}
    >
      {/* Soft gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(94,234,212,0.16),transparent_30%)]" />

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="relative overflow-hidden flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl shadow-slate-900/40 px-4 lg:px-6 py-4">
            <div className="absolute inset-0 opacity-60 pointer-events-none">
              <div className="absolute -left-10 top-0 h-full w-24 bg-gradient-to-b from-fuchsia-400/40 to-indigo-500/20 blur-3xl" />
              <div className="absolute -right-6 top-1/3 h-24 w-24 bg-cyan-400/20 blur-2xl" />
            </div>

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                Welcome
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow">
                {greetText}
              </h3>
            </div>

            <div className="relative flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/15 px-3 py-1 text-[13px] font-semibold text-white shadow-sm shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                {date}
              </span>
              {token && (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-semibold text-sm px-4 py-2 shadow-md shadow-amber-500/40 border border-amber-200/60 hover:scale-[1.02] active:scale-100 transition"
                >
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className="text-slate-900"
                  />
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  greetText: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  token: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};
