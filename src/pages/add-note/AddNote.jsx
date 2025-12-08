import AddNoteForm from "@/pages/add-note/components/AddNoteForm";
import useAuthGuard from "@/pages/useAuthGuard";
import { useEffect } from "react";

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
