import AddNoteForm from "../components/AddNoteForm";
import Sidebar from "../components/Sidebar";
import "./AddNote.scss";
import HomePage from "./HomePage";

function AddNote() {
  return (
    <>
    {/* < className="add-note-container"> */}
      <div className="flex">
        <Sidebar />
        <div className="flex">
          {/* <HomePage /> */}
          <AddNoteForm />
        </div>
      </div>
    </>
  );
}

export default AddNote;
