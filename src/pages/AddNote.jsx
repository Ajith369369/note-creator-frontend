import { useEffect } from "react";
import AddNoteForm from "../components/AddNoteForm";
import useAuthGuard from "./useAuthGuard";

function AddNote() {
  // Check if user is authenticated
  useAuthGuard();

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
