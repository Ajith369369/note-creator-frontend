import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetNoteFormState,
  updateNoteFormState,
} from "../redux/slices/noteSlice";
import "./AddNoteForm.scss";

const AddNoteForm = () => {
  const dispatch = useDispatch();
  /*   const [formData, setFormData] = useState({
    noteTitle: "",
    noteContent: "",
  }); */
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const noteFormState = useSelector((state) => state.noteDetails.noteFormState);

  const onFormDataChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    if (name === "noteTitle") {
      if (value.length === 0) {
        setTitleError(true);
      } else {
        setTitleError(false);
        setCanSave(true);
      }
    }

    if (name === "noteContent") {
      if (value.length === 0) {
        setContentError(true);
      } else {
        setContentError(false);
        setCanSave(true);
      }
    }
    dispatch(updateNoteFormState({ [name]: value }));
    console.log("noteFormState: ", noteFormState);
    /* setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    }); */
  };

  const onSaveNoteClicked = async () => {
    if (!titleError && !contentError) {
      // dispatch(addNewNote(formData));
      // Using object destructuring to extract the values for noteTitle, noteContent, noteImage, and noteDate from the noteDetails object.
      const { noteTitle, noteContent, noteImage, noteDate } =
        noteDetails;

      // if statement checks if any of the required fields (title, language, github, website, overview, noteImg) are empty. If any field is missing, it triggers an alert to inform the user to complete the form.
      if (
        !noteTitle ||
        !noteContent ||
        !noteImage ||
        !noteDate
      ) {
        alert("Please fill the form completely.");
      } else {
        // A FormData object is created, which is used to construct a set of key/value pairs representing form fields and their values. This is particularly useful for sending data that includes files (like images) via HTTP requests.
        const reqBody = new FormData();

        // append() - add data to the object
        // Each line appends a piece of data to the FormData object. This includes the form field names (noteTitle, noteContent, etc.) and their corresponding values.
        // The append() method adds key-value pairs to the FormData object, where the key is the form field name and the value is the content of the field.
        reqBody.append("noteTitle", noteTitle); // Postman Body > form-data
        reqBody.append("noteContent", noteContent); // Postman Body > form-data
        reqBody.append("noteImage", noteImage); // Postman Body > form-data
        reqBody.append("noteDate", noteDate); // Postman Body > form-data

        // Retrieves a token from the browser's sessionStorage.
        // The token is used for authentication, verifying that the user is allowed to perform the action (adding a note).
        const token = sessionStorage.getItem("token");

        // This checks whether the token was successfully retrieved from sessionStorage.
        // If the token exists, it proceeds to set the request headers and send the data.
        if (token) {
          // This defines the headers for the HTTP request
          const reqHeader = {
            // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
            // Select form-data in body section in Postman.
            // Bearer - No other certificate is required to verify this token.
            // iat : Time atwhich token is generated.
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };

          // Calls the addProjectApi function, passing in the reqBody (form data) and reqHeader (headers).
          const result = await addProjectApi(reqBody, reqHeader);
          console.log(
            "Result of the addProjectApi call to the console: ",
            result
          );

          if (result.status == 200) {
            alert("Project added successfully.");
            handleClose();
          } else {
            alert("Something went wrong.");
            handleClose();
          }
        }
      }

      toast.success("New Note added successfully");
      dispatch(resetNoteFormState);
    }
  };

  return (
    <div>
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
              onChange={(e) => onFormDataChange(e)}
              className="form-control"
              value={noteFormState.noteTitle}
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
              onChange={(e) => onFormDataChange(e)}
              className="form-control"
              rows="10"
              value={noteFormState.noteContent}
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
          <ToastContainer
            position="top-center"
            theme="colored"
            autoclose={3000}
          />
        </form>
      </section>
    </div>
  );
};

export default AddNoteForm;
