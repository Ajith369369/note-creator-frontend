import EditNoteForm from "@/components/EditNoteForm";
import { useEffect } from "react";
import useAuthGuard from "./useAuthGuard";

function EditNote() {
  // Check if user is authenticated
  useAuthGuard();

  // Scroll to the top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <EditNoteForm />
    </>
  );
}

export default EditNote;
