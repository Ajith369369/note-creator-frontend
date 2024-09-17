import EditNoteForm from "../components/EditNoteForm";
import useAuthGuard from "./useAuthGuard";

function EditNote() {

  // Check if user is authenticated
  useAuthGuard();

  return (
    <>
      <EditNoteForm />
    </>
  );
}

export default EditNote;
