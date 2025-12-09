import { updateNotes } from "@/redux/slices/noteSlice";
import {
  deleteNoteOfAUserApi,
  getAllNotesOfAUserApi,
} from "@/services/nc_allApi";
import { formatDistanceToNow, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotesList({ notes }) {
  console.log("notes props received from NotesPage.jsx: ", notes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshNotes = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        // "Content-Type": "application/json" is used to send requests without uploaded content.
        // Select form-data in body section in Postman.
        // Bearer - No other certificate is required to verify this token.
        // iat : Time atwhich token is generated.
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllNotesOfAUserApi("", reqHeader);
      dispatch(updateNotes(result.data));
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        // "Content-Type": "application/json" is used to send requests without uploaded content.
        // Select form-data in body section in Postman.
        // Bearer - No other certificate is required to verify this token.
        // iat : Time atwhich token is generated.
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await deleteNoteOfAUserApi(id, reqHeader);
      if (result.status == 200) {
        window.scrollTo(0, 0);
        console.log("Result of Delete operation: ", result);
        toast.success("Note deleted successfully.");
        refreshNotes();
      }
    }
  };

  const handleNavigate = (selected_note) => {
    // Navigate with the selected note's data.
    // { state: { selectedNote: selected_note } }: This is an object where the state key contains another object with a key selectedNote that holds the value, selected_note passed to the function. This effectively passes the selected_note data to the new route (/profile-home/edit).
    navigate("/profile-home/edit", { state: { selectedNote: selected_note } });
  };

  const handleNavigate_2 = (selected_note) => {
    // Navigate with the selected note's data.
    // { state: { selectedNote: selected_note } }: This is an object where the state key contains another object with a key selectedNote that holds the value, selected_note passed to the function. This effectively passes the selected_note data to the new route (/profile-home/note).
    navigate("/profile-home/note", { state: { selectedNote: selected_note } });
  };

  console.log("notes in NotesList.jsx: ", notes);
  if (!notes || notes?.length === 0) {
    return (
      <div className="mx-3 my-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-slate-900/40 p-8 flex flex-col items-start gap-3 text-white">
          <div className="absolute -right-10 -top-10 h-32 w-32 bg-gradient-to-br from-white/10 to-white/0 rounded-full blur-3xl opacity-40" />
          <div className="absolute -left-6 bottom-0 h-24 w-24 bg-gradient-to-tr from-red-salsa/30 to-orange-300/10 blur-3xl opacity-50" />
          <p className="text-lg font-semibold">No notes found</p>
          <p className="text-sm text-white/80">
            Start by creating your first note to see it appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-3 my-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-slate-900/40 p-6">
          <div className="absolute -left-12 top-0 h-32 w-32 bg-gradient-to-b from-emerald-400/30 to-indigo-500/10 blur-3xl" />
          <div className="absolute -right-10 bottom-6 h-28 w-28 bg-rose-400/20 blur-2xl" />

          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h5 className="text-lg font-semibold uppercase tracking-wide text-white">
              Notes
            </h5>
            <span className="text-sm text-white/80 bg-white/10 border border-white/10 rounded-full px-3 py-1">
              {notes.length} total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            {notes?.map((note) => {
              return (
                <div
                  key={note?._id}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg shadow-slate-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-80" />
                  <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-red-salsa/20 blur-xl" />
                  <div className="relative p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-white line-clamp-2">
                        {note?.noteTitle}
                      </h3>
                      <span className="text-[11px] font-semibold text-white/80 bg-white/10 border border-white/10 rounded-full px-2 py-1">
                        {formatDistanceToNow(parseISO(note?.noteDate))}
                      </span>
                    </div>

                    <p className="text-sm text-white/80 leading-relaxed line-clamp-4">
                      {note?.noteContent}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center justify-center h-9 w-9 rounded-lg bg-red-500/15 border border-red-400/30 text-red-200 hover:bg-red-500/25 transition"
                          onClick={() => handleDelete(note?._id)}
                        >
                          <ImCancelCircle />
                        </button>
                        <button
                          type="button"
                          className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/25 transition"
                          onClick={() => handleNavigate(note)}
                        >
                          <FiEdit />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNavigate_2(note)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 border border-white/10 rounded-full px-3 py-2 hover:bg-white/15 transition"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoclose={1000} />
    </>
  );
}

export default NotesList;

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      noteTitle: PropTypes.string,
      noteContent: PropTypes.string,
      noteDate: PropTypes.string,
    }),
  ),
};
