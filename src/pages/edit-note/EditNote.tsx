/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import useScrollToTop from "@/hooks/useScrollToTop";
import EditNoteForm from "@/pages/edit-note/components/EditNoteForm";

function EditNote() {
  useScrollToTop();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="pointer-events-none absolute -left-16 -top-14 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="relative">
            <EditNoteForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditNote;
