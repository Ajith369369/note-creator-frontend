import noteCreatorLogo from "@/assets/images/note-creator-square-logo.jpeg";
import useAuthGuard from "@/hooks/useAuthGuard";
import NotesList from "@/pages/notes-page/components/NotesList";
import { updateNotes } from "@/redux/slices/noteSlice";
import { getAllNotesOfAUserApi } from "@/services/nc_allApi";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Note = {
  _id?: string;
  noteTitle?: string;
  noteContent?: string;
  noteDate?: string;
  noteImage?: string;
};

type RootState = {
  noteDetails: {
    notes: Note[];
  };
};

function NotesPage() {
  // Check if user is authenticated
  useAuthGuard();

  const [isToken, setIsToken] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();
  const notesFromNoteSlice = useSelector(
    (state: RootState) => state.noteDetails.notes
  );

  const getAllNotesOfAUser = useCallback(
    async (searchKeyValue: string) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await getAllNotesOfAUserApi(searchKeyValue, reqHeader);
        dispatch(updateNotes(result.data));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getAllNotesOfAUser(searchKey);
  }, [searchKey, getAllNotesOfAUser]);

  useEffect(() => {
    setIsToken(sessionStorage.getItem("token"));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* background ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_60%_80%,rgba(74,222,128,0.14),transparent_30%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
        {isToken ? (
          <>
            {/* heading */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <p className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-emerald-100 bg-white/5 border border-white/10 rounded-full backdrop-blur">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Your notes, beautifully organized
                </p>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white drop-shadow">
                  Notes
                </h1>
                <p className="text-slate-200/80 text-sm md:text-base">
                  Search, browse, and manage everything in one calm space.
                </p>
              </div>
            </div>

            {/* search card */}
            <div className="mb-8">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-slate-900/40">
                <div className="absolute -left-10 top-0 h-full w-24 bg-gradient-to-b from-emerald-400/30 to-indigo-500/10 blur-3xl" />
                <div className="absolute -right-6 top-1/3 h-24 w-24 bg-cyan-400/15 blur-2xl" />
                <div className="relative p-4 md:p-6 flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-center gap-3 w-full md:w-2/3">
                    <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-400/20 border border-emerald-200/40 text-emerald-100">
                      <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 text-slate-900 border border-white/40 shadow-inner shadow-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition"
                      placeholder="Search by note title..."
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-auto text-sm text-slate-200/80">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      {notesFromNoteSlice?.length || 0} notes found
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NotesList notes={notesFromNoteSlice} />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <div className="max-w-md w-full text-center space-y-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-xl shadow-slate-900/40 p-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 blur-3xl opacity-30" />
                  <img
                    src={noteCreatorLogo}
                    alt=""
                    className="relative w-40 h-40 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Please log in</h3>
              <p className="text-slate-200/80">
                Sign in to view, search, and manage your notes.
              </p>
              <Link to={"/login"}>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-slate-900 bg-white shadow-lg shadow-white/20 hover:shadow-white/30 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;
