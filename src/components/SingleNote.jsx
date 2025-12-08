// import { getAllNotes } from "../../features/notes/noteSlice";
import { serverUrl } from "@/services/nc_serverUrl";
import { useLocation } from "react-router-dom";
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
    <section className="px-4">
      <div className="border-b border-black/10">
        <h1 className="font-bold text-center my-2">
          {selectedNote?.noteTitle}
        </h1>
      </div>
      <div className="py-4 flex justify-center items-center">
        <img
          src={`${serverUrl}/uploads/${selectedNote?.noteImage}`}
          alt=""
          className="max-h-96 w-auto"
        />
      </div>
      <div className="py-4">
        <h4 className="text-justify normal-case">
          {selectedNote?.noteContent}
        </h4>
      </div>
    </section>
  );
};

export default SingleNotePage;
