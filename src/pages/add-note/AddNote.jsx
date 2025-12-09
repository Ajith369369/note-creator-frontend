import useAuthGuard from "@/hooks/useAuthGuard";
import AddNoteForm from "@/pages/add-note/components/AddNoteForm";
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
