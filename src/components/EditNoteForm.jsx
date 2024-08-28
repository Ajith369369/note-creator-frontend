import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editNoteOfAUserApi, getANoteOfAUserApi } from "../services/nc_allApi";
import { serverUrl } from "../services/nc_serverUrl";
import "./EditNoteForm.scss";

function EditNoteForm() {
  // const { noteId } = useParams();
  // console.log('noteId: ', noteId)
  const location = useLocation();
  const selectedNote = location.state?.selectedNote;
  console.log("selectedNote: ", selectedNote);
  console.log("selectedNote?.userId: ", selectedNote?.userId);
  console.log("selectedNote?._id: ", selectedNote?._id);

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
    title: "",
    content: "",
    date: "",
    noteImg: "",
  });

  const getANoteOfAUser = async (noteId) => {
    const result = await getANoteOfAUserApi(noteId);
    console.log("getANoteOfAUserApi() result: ", result);
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

  const handleFile = async (e) => {
    console.log(e);
    console.log(e.target.files);
    console.log(e.target.files[0]);
    setNoteDetails({
      ...noteDetails,
      noteImage: e.target.files[0],
    });
  };

  const onSaveNoteClicked = async () => {
    /* if (!titleError && !contentError) {
      console.log(formData);
      dispatch(editNote(formData));
      toast("Note edited successfully");
      setFormData({ noteTitle: "", noteContent: "" });
    } */
    const { noteTitle, noteContent, noteImage, noteDate } = selectedNote;
    if (!noteTitle || !noteContent || !noteImage || !noteDate) {
      toast.info("Please fill the form completely.");
    } else {
      // A FormData object is created, which is used to construct a set of key/value pairs representing form fields and their values. This is particularly useful for sending data that includes files (like images) via HTTP requests.
      const reqBody = new FormData();

      // append() - add data to the object
      // Each line appends a piece of data to the FormData object. This includes the form field names (title, language, etc.) and their corresponding values.
      // The append() method adds key-value pairs to the FormData object, where the key is the form field name and the value is the content of the field.
      reqBody.append("noteTitle", noteTitle); // Postman Body > form-data
      reqBody.append("noteContent", noteContent); // Postman Body > form-data
      reqBody.append("noteDate", noteDate); // Postman Body > form-data
      preview
        ? reqBody.append("noteImage", noteImage)
        : reqBody.append("noteImage", selectedNote?.noteImage); // Postman Body > form-data

      // Retrieves a token from the browser's sessionStorage.
      // The token is used for authentication, verifying that the user is allowed to perform the action (adding a project).
      const token = sessionStorage.getItem("token");

      // This checks whether the token was successfully retrieved from sessionStorage.
      // If the token exists, it proceeds to set the request headers and send the data.
      if (token) {
        if (preview) {
          const reqHeader = {
            // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
            // Select form-data in body section in Postman.
            // Bearer - No other certificate is required to verify this token.
            // iat : Time atwhich token is generated.
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };
          const result = await editNoteOfAUserApi(
            selectedNote?._id,
            reqBody,
            reqHeader
          );
          console.log(
            "Result of the editUserProjectApi call to the console: ",
            result
          );
          if (result.status == 200) {
            toast.success("Note updated successfully.");
          } else {
            toast.error("Something went wrong.");
          }
        } else {
          const reqHeader = {
            // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
            // Select form-data in body section in Postman.
            // Bearer - No other certificate is required to verify this token.
            // iat : Time atwhich token is generated.
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const result = await editNoteOfAUserApi(
            selectedNote?._id,
            reqBody,
            reqHeader
          );
          console.log(
            "Result of the editUserProjectApi call to the console: ",
            result
          );
          if (result.status == 200) {
            toast.success("Note updated successfully.");
          } else {
            toast.error("Something went wrong.");
          }
        }
      }
    }
  };

  useEffect(() => {
    getANoteOfAUser(selectedNote?._id);
  }, []);

  return (
    <>
      <div>
        <section className="note-form-section">
          <h2 className="my-4 fs-16">Edit Note</h2>
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
                // Keep your inputs consistently controlled by ensuring their value is always defined, even if it’s just an empty string.
                value={selectedNote?.noteTitle || ""}
              />
              <span className="form-error-text">
                {titleError ? "Title can't be empty!" : ""}
              </span>
            </div>
            <div className="form-element">
              <label htmlFor="noteImg" className="form-label">
                Image:
              </label>
              <label htmlFor="noteImg">
                <input
                  type="file"
                  id="noteImg"
                  style={{ display: "none" }}
                  key={key}
                  onChange={(e) => handleFile(e)}
                />
                <img
                  src={
                    preview
                      ? preview
                      : `${serverUrl}/uploads/${selectedNote?.noteImage}`
                  }
                  alt=""
                  style={{ height: "100px" }}
                />
              </label>
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
                // Keep your inputs consistently controlled by ensuring their value is always defined, even if it’s just an empty string.
                value={selectedNote?.noteContent || ""}
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
