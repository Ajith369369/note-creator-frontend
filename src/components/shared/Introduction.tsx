import type { ReactElement } from "react";
import { BsFillInfoCircleFill, BsPinAngle } from "react-icons/bs";
import { CgArrangeFront } from "react-icons/cg";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { TbCaptureFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

type FeatureCard = {
  icon: ReactElement;
  title: string;
  desc: string;
};

const featureCards: FeatureCard[] = [
  {
    icon: <LuStickyNote className="w-12 h-12 text-amber-300" />,
    title: "Project Management",
    desc: "Tackle any project with your notes, all in one place.",
  },
  {
    icon: <BsPinAngle className="w-12 h-12 text-rose-300" />,
    title: "Remember Everything",
    desc: "Capture thoughts anywhere. Text, images, and inspiration stay safe and ready.",
  },
  {
    icon: <FaSearch className="w-12 h-12 text-cyan-300" />,
    title: "Find Things Fast",
    desc: "Powerful, reliable search to surface the right info instantly.",
  },
  {
    icon: <BsFillInfoCircleFill className="w-12 h-12 text-indigo-300" />,
    title: "Your Information, Your Way",
    desc: "Meeting notes, receipts, manuals, or family recipes—kept secure.",
  },
  {
    icon: <TbCaptureFilled className="w-12 h-12 text-emerald-300" />,
    title: "Capture Everything",
    desc: "Ideas on the go, saved with clarity. Stay productive anywhere.",
  },
  {
    icon: <IoDocumentAttachOutline className="w-12 h-12 text-blue-300" />,
    title: "Document Everything",
    desc: "Keep your important notes with you, whenever and wherever you need them.",
  },
  {
    icon: <CgArrangeFront className="w-12 h-12 text-fuchsia-300" />,
    title: "Organize Your Life",
    desc: "Remember everything and tackle any project in one calm workspace.",
  },
  {
    icon: <GrWorkshop className="w-12 h-12 text-teal-300" />,
    title: "Take Notes, Take Action",
    desc: "Create tasks inside notes for context and faster execution.",
  },
  {
    icon: <FaSyncAlt className="w-12 h-12 text-lime-300" />,
    title: "Safe And Synced",
    desc: "Notes stay online and in sync across all your devices.",
  },
  {
    icon: <FaSearch className="w-12 h-12 text-sky-300" />,
    title: "Search Made Easy",
    desc: "Use note titles to reliably retrieve the right information quickly.",
  },
];

function Introduction() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_60%_80%,rgba(74,222,128,0.16),transparent_32%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-100 bg-white/5 border border-white/10 rounded-full backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            The simplest way to keep notes
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            All your notes in one beautiful place
          </h1>
          <p className="text-lg md:text-xl text-slate-200/90 max-w-3xl mx-auto">
            Capture, organize, and find your ideas effortlessly. Delightfully
            minimal, endlessly powerful.
          </p>
          <Link
            to="/profile-home/add"
            className="inline-flex justify-center items-center mt-4"
          >
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-base font-semibold text-white bg-red-salsa shadow-lg shadow-white/20 hover:shadow-white/30 transition">
              Create A Note
            </button>
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-slate-900/40 p-6 hover:-translate-y-1 transition transform duration-200"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 bg-gradient-to-br from-white/10 to-white/0 rounded-full blur-3xl opacity-40" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 rounded-2xl bg-white/10 border border-white/10 p-3 shadow-inner shadow-black/30">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-200/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Ready to capture your next idea?
          </h2>
          <Link
            to="/profile-home/add"
            className="inline-flex justify-center items-center"
          >
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-base font-semibold text-white border border-white/20 bg-red-salsa shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition">
              Create A Note
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
