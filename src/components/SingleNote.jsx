// import { getAllNotes } from "../../features/notes/noteSlice";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../services/nc_serverUrl";
import "./SingleNote.scss";
// import { useParams } from 'react-router';

const SingleNotePage = () => {
  // Scroll to the top on component mount
  window.scrollTo(0, 0);

  const location = useLocation();
  const selectedNote = location.state?.selectedNote;
  console.log("selectedNote: ", selectedNote);
  // const { id } = useParams();
  // const notes = useSelector(getAllNotes);
  // let tempNote = notes.filter((note) => note.noteId === id);
  return (
    <section className="note-single-section px-4">
      <div className="note-single-title">
        <h1 className="fw-bold text-center my-2">{selectedNote?.noteTitle}</h1>
      </div>
      <div className="py-4 d-flex justify-content-center align-items-center">
        <img src={`${serverUrl}/uploads/${selectedNote?.noteImage}`} alt="" />
      </div>
      <div className="py-4">
        <h4>{selectedNote?.noteContent}</h4>
      </div>
    </section>
  );
};

export default SingleNotePage;
