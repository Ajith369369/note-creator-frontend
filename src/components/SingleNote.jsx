// import { getAllNotes } from "../../features/notes/noteSlice";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../services/nc_serverUrl";
import "./SingleNote.scss";
// import { useParams } from 'react-router';

const SingleNotePage = () => {
  const location = useLocation();
  const selectedNote = location.state?.selectedNote;
  console.log("selectedNote: ", selectedNote);
  // const { id } = useParams();
  // const notes = useSelector(getAllNotes);
  // let tempNote = notes.filter((note) => note.noteId === id);
  return (
    <section className="note-single-section px-4">
      <div className="note-single-title">
        <h2 className="my-2 fs-20">{selectedNote?.noteTitle}</h2>
      </div>
      <div className="py-4">
        <img src={`${serverUrl}/uploads/${selectedNote?.noteImage}`} alt="" />
      </div>
      <div className="py-4">
        <p>{selectedNote?.noteContent}</p>
      </div>
    </section>
  );
};

export default SingleNotePage;
