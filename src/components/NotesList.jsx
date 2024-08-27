import { ImCancelCircle } from "react-icons/im";
import "./NotesList.scss";
import {FiEdit} from "react-icons/fi";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeNote } from "../redux/slices/noteSlice";
// import EditNoteForm from "./EditNoteForm";
function NotesList({ notes }) {
  const dispatch = useDispatch();

  console.log('notes in NotesList.jsx: ', notes)
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
                <div className="notes-item-date text-capitalize">
                  {formatDistanceToNow(parseISO(note?.noteDate))}
                </div>
                <div className="notes-item-btns flex align-center justify-between">
                  <div>
                    <button
                      type="button"
                      className="notes-item-btn"
                      onClick={() => dispatch(removeNote(note?._id))}
                    >
                      <ImCancelCircle />
                    </button>
                    {/* <EditNoteForm note={note} /> */}
                    <Link to = {`/profile-home/edit/${note?._id}`} className = "notes-item-btn">
                      <FiEdit />
                    </Link>
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
    </>
  );
}

export default NotesList;
