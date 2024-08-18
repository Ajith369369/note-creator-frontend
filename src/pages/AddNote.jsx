import AddNoteForm from "../components/AddNoteForm";
import Sidebar from "../components/Sidebar";
import './AddNote.scss';

function AddNote() {
  return (
    <>
      <div className="add-note-container">
        <Sidebar />
        <AddNoteForm/>
      </div>
    </>
  );
}

export default AddNote;
