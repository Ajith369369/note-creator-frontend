import headerImg from "@/assets/images/header_img.jpg";
import noteCreatorLogo from "@/assets/images/note-creator-square-logo.jpeg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.25),transparent_30%),radial-gradient(circle_at_80%_30%,_rgba(34,211,238,0.2),transparent_30%)]" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${headerImg})`,
          }}
        />

        <div className="relative z-10 w-full max-w-6xl px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl p-8 md:p-12">
            <div className="space-y-6 text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/15 rounded-full backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sync your ideas anywhere
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  Note Creator
                </h1>
                <p className="text-lg md:text-xl text-slate-200/90 max-w-2xl">
                  Capture thoughts, organize projects, and keep everything
                  beautiful, minimal, and in sync across your workspace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                {!token ? (
                  <Link to="/login" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-slate-900 bg-white shadow-lg shadow-white/20 hover:shadow-white/30 transition">
                      Get Started
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-slate-800"
                      />
                    </button>
                  </Link>
                ) : (
                  <Link
                    to="/profile-home/introduction"
                    className="w-full sm:w-auto"
                  >
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-slate-900 bg-white shadow-lg shadow-white/20 hover:shadow-white/30 transition">
                      Manage Notes
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-slate-800"
                      />
                    </button>
                  </Link>
                )}
                {/* <Link to="/profile-home/notes" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white border border-white/30 bg-white/5 hover:bg-white/10 transition backdrop-blur">
                    View Notes
                  </button>
                </Link> */}
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-40 animate-pulse" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
                  <img
                    src={noteCreatorLogo}
                    alt="Note Creator"
                    className="h-[360px] w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
