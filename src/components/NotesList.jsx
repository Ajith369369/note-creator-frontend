import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteNoteOfAUserApi } from "../services/nc_allApi";
import "./NotesList.scss";
// import EditNoteForm from "./EditNoteForm";

function NotesList({ notes }) {
  const [allnotes, setAllNotes] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllNotesOfAUser = async (searchKey) => {
    const result = await getAllNotesOfAUserApi(searchKey);
    setAllNotes(result.data);
  };

  console.log("notes in NotesList.jsx: ", notes);
  if (!notes || notes?.length === 0) {
    return <div className="not-found">No notes found</div>;
  }

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
        // toast.success("Note deleted successfully.", {onClose:()=>});
      }
    }
  };

  const handleNavigate = (selected_note) => {
    // Navigate with the selected note's data.
    // { state: { selectedNote: selected_note } }: This is an object where the state key contains another object with a key selectedNote that holds the value, selected_note passed to the function. This effectively passes the selected_note data to the new route (/profile-home/edit).
    navigate("/profile-home/edit", { state: { selectedNote: selected_note } });
  };

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

                  <Link
                    to={`/note/${note?._id}`}
                    className="read-more-btn fs-14"
                  >
                    Read More
                  </Link>
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
