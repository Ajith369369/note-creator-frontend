import useScrollToTop from "@/hooks/useScrollToTop";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import pageNotFound from "/src/assets/images/pnf-octocat.gif";

function NotFoundPage() {
  useScrollToTop();
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-52 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-cyan-400/10" />
              <img
                src={pageNotFound}
                alt="Lost octocat"
                className="relative h-80 w-full object-contain"
              />
            </div>
          </div>

          <div className="order-1 space-y-5 lg:order-2">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">
              404 • Page not found
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              You’ve wandered off the map
            </h1>
            <p className="text-lg text-slate-200/85">
              The page you’re looking for is missing, moved, or never existed.
              Let’s guide you back to safer paths.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to={"/"}>
                <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-400/40 active:translate-y-[1px]">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-base transition group-hover:-translate-x-0.5"
                  />
                  Back home
                </button>
              </Link>
              <Link to={"/profile-home/notes"}>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white/40 hover:bg-white/10 active:translate-y-[1px]">
                  Explore notes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
