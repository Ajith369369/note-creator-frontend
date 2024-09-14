import { useEffect } from "react";
import AddNoteForm from "../components/AddNoteForm";
import "./AddNote.scss";

function AddNote() {

   // Scroll to the top on component mount
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AddNoteForm />
    </>
  );
}

export default AddNote;
