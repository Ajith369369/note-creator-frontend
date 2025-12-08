import EditNoteForm from "@/components/EditNoteForm";
import useAuthGuard from "@/pages/useAuthGuard";
import { useEffect } from "react";

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
