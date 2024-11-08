import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateNotes } from "../redux/slices/noteSlice";
import {
  deleteNoteOfAUserApi,
  getAllNotesOfAUserApi,
} from "../services/nc_allApi";
import "./NotesList.scss";
// import EditNoteForm from "./EditNoteForm";

function NotesList({ notes }) {
  console.log("notes props received from NotesPage.jsx: ", notes);

  const dispatch = useDispatch();
  const notesFromNoteSlice = useSelector((state) => state.noteDetails.notes);

  const [allnotes, setAllNotes] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const getAllNotesOfAUser = async (searchKey) => {
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
      const result = await getAllNotesOfAUserApi(searchKey, reqHeader);
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
        console.log('Result of Delete operation: ', result)
        toast.success("Note deleted successfully.");
        setDeleteStatus(true);
      }
    }
  };

  useEffect(() => {
    getAllNotesOfAUser(searchKey);
    setDeleteStatus(false);
  }, [deleteStatus]);

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
    return <div className="not-found">No notes found</div>;
  }

  return (
    <>
      <div className="notes">
        <h5 className="fs-18 fw-8 text-uppercase notes-title">notes</h5>
        <div className="notes-list grid">
          {notes?.map((note) => {
            return (
              <div className="notes-item" key={note?._id}>
                <div className="notes-item-title">
                  {note?.noteTitle.substring(0, 80) + "..."}
                </div>
                <div className="notes-item-body">
                  {note?.noteContent.substring(0, 150) + "..."}
                </div>
                {/* formatDistanceToNow(parseISO(note?.noteDate)): It is used to format a date (in this case, note?.noteDate) into a human-readable relative time, showing how long ago that date was compared to the current time. It's a combination of two functions from the date-fns library.
                
                parseISO(note?.noteDate): This function parses a string in ISO 8601 format (e.g., "2023-09-12T08:00:00Z") into a JavaScript Date object.
                
                formatDistanceToNow(date): This function takes a JavaScript Date object and calculates the relative distance from that date to the current time. It returns a string like "5 minutes ago", "3 days ago", "1 month ago", etc., depending on how far the noteDate is from the current time. */}
                <div className="notes-item-date text-capitalize">
                  {formatDistanceToNow(parseISO(note?.noteDate))}
                </div>
                <div className="notes-item-btns flex align-center justify-between">
                  <div>
                    <button
                      type="button"
                      className="notes-item-btn"
                      // onClick={() => dispatch(removeNote(note?._id))}
                      onClick={() => handleDelete(note?._id)}
                    >
                      <ImCancelCircle />
                    </button>
                    {/* <EditNoteForm note={note} /> */}
                    {/* <Link to = {`/profile-home/edit/${note?._id}`} className = "notes-item-btn">
                      <FiEdit />
                    </Link> */}
                    <button
                      type="button"
                      className="notes-item-btn"
                      onClick={() => handleNavigate(note)}
                    >
                      <FiEdit />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigate_2(note)}
                    className="read-more-btn fs-14"
                  >
                    Read More
                  </button>
                  {/* <Link
                    to={`/note/${note?._id}`}
                    className="read-more-btn fs-14"
                  >
                    Read More
                  </Link> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoclose={1000} />
    </>
  );
}

export default NotesList;
