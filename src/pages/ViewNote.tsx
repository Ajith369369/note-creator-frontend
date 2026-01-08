import useScrollToTop from "@/hooks/useScrollToTop";
import { serverUrl } from "@/services/nc_serverUrl";
import { useLocation } from "react-router-dom";

type Note = {
  noteTitle?: string;
  noteDate?: string;
  noteImage?: string;
  noteContent?: string;
};

const ViewNote = () => {
  useScrollToTop();
  const location = useLocation();
  const selectedNote = (location.state as { selectedNote?: Note } | null)
    ?.selectedNote;

  const imageSrc = selectedNote?.noteImage
    ? `${serverUrl}/uploads/${selectedNote.noteImage}`
    : undefined;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <section className="relative space-y-8">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">
              Featured note
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              {selectedNote?.noteTitle || "Untitled note"}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-200/80">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {selectedNote?.noteDate || "Date not available"}
              </span>
              <span className="rounded-full border border-emerald-200/30 bg-emerald-300/10 px-3 py-1 text-emerald-100">
                Elegant view
              </span>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={selectedNote?.noteTitle || "Note cover"}
                    className="h-[340px] w-full object-cover transition duration-700 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-[340px] w-full items-center justify-center text-slate-200/70">
                    No image available
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                  Visual highlight
                </div>
              </div>
            </div>

            <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-emerald-100">
                Note content
              </h2>
              <p className="leading-relaxed text-slate-100">
                {selectedNote?.noteContent || "No content available."}
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
                Tip: Keep your notes concise and let strong visuals carry the
                mood. Subtle contrasts and generous spacing make reading feel
                effortless.
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewNote;
