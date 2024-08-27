import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editNote } from "../redux/slices/noteSlice";
import { getANoteOfAUserApi } from "../services/nc_allApi";
import "./Notes.scss";

function EditNoteForm() {
  // const { noteId } = useParams();
  // console.log('noteId: ', noteId)
  const location = useLocation();
  const selectedNote = location.state?.selectedNote;
  console.log('selectedNote: ', selectedNote)

  const dispatch = useDispatch();
  // const notes = useSelector(getAllNotes);
  // let tempNote = notes.filter(note => note.noteId === id);

  // const [formData, setFormData] = useState(tempNote[0]);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(false);
  const [noteDetails, setNoteDetails] = useState({
    title: note.noteTitle,
    content: note.noteContent,
    date: note.noteDate,
    noteImg: "",
  });

  const getANoteOfAUser = async (noteId) => {
    const result = await getANoteOfAUserApi(noteId);
    setNoteDetails(result.data);
  };

  console.log("noteDetails: ", noteDetails);
  /* const onFormDataChange = (event) => {
    event.preventDefault();
    if(event.target.name === 'noteTitle'){
      if(event.target.value.length === 0){
        setTitleError(true);
      } else {
        setTitleError(false);
        setCanSave(true);
      }
    }

    if(event.target.name === 'noteContent'){
      if(event.target.value.length === 0){
        setContentError(true);
      } else {
        setContentError(false);
        setCanSave(true);
      }
    }

    setFormData(prevData => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    })
  } */

  const onSaveNoteClicked = () => {
    if (!titleError && !contentError) {
      console.log(formData);
      dispatch(editNote(formData));
      toast("Note edited successfully");
      setFormData({ noteTitle: "", noteContent: "" });
    }
  };

  useEffect(() => {
    getANoteOfAUser(noteId);
  }, []);

  return (
    <>
      <div>
        <FiEdit />
        <section className="note-form-section">
          <h2 className="my-4 fs-16">Add New Note</h2>
          <form className="note-form">
            <div className="form-element">
              <label htmlFor="noteTitle" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="noteTitle"
                name="noteTitle"
                placeholder="Note title here ..."
                onChange={(e) =>
                  setNoteDetails({
                    ...noteDetails,
                    title: e.target.value,
                  })
                }
                className="form-control"
                value={noteDetails?.title}
              />
              <span className="form-error-text">
                {titleError ? "Title can't be empty!" : ""}
              </span>
            </div>

            <div className="form-element">
              <label htmlFor="noteContent" className="form-label">
                Content:
              </label>
              <textarea
                id="noteContent"
                name="noteContent"
                placeholder="Note content here ..."
                onChange={(e) =>
                  setNoteDetails({
                    ...noteDetails,
                    content: e.target.value,
                  })
                }
                className="form-control"
                rows="10"
                value={noteDetails?.content}
              ></textarea>
              <span className="form-error-text">
                {contentError ? "Content can't be empty!" : ""}
              </span>
            </div>

            <button
              type="button"
              onClick={onSaveNoteClicked}
              className="btn btn-default"
              disabled={!canSave}
            >
              Save Note
            </button>
            <ToastContainer />
          </form>
        </section>
      </div>
    </>
  );
}

export default EditNoteForm;
