import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../assets/images/note-creator-square-logo.jpeg";
import {
  resetNoteFormState,
  updateNoteFormState,
} from "../redux/slices/noteSlice";
import { addNoteOfAUserApi } from "../services/nc_allApi";
import "./AddNoteForm.scss";

function AddNoteForm() {
  const dispatch = useDispatch();
  /*   const [formData, setFormData] = useState({
    noteTitle: "",
    noteContent: "",
  }); */
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(false);
  const noteFormState = useSelector((state) => state.noteDetails.noteFormState);
  const [noteDetails, setNoteDetails] = useState({
    noteTitle: "",
    noteContent: "",
    noteImage: "",
    noteDate: "",
  });
  console.log("noteDetails: ", noteDetails);

  // #region Multi-line Comment
  /**
   * Initialize a state to track when the image has been set.
   * imageSet is a state variable that tracks when the image is properly set in noteDetails. Once the image is set, the useEffect hook will run, checking all fields, including noteImage, to ensure they are populated before proceeding.
   * This ensures that the form validation and submission logic only runs after noteImage is properly stored in the noteDetails state.
   */
  // #endregion
  const [imageSet, setImageSet] = useState(false);

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


  // #region Multi-line Comment
  /**
   * Handle the upload of the default image if no image is selected.
   * Convert default image to a file object.
   * The fetchDefaultImageFile function essentially fetches a local image file, converts it into a format that can be uploaded or manipulated (a File object), and then returns that file. This allows you to treat the default image as if it were a file selected by a user.
   * const fetchDefaultImageFile = async () => { ... }: This line declares an asynchronous function named fetchDefaultImageFile that returns a Promise.
   * Using async allows the use of await within the function to handle asynchronous operations in a more readable way.
   */
  // #endregion
  const fetchDefaultImageFile = async () => {

    // #region Multi-line Comment
    /**
     * This line sends a request to fetch the default image file.
     * fetch(defaultImage) makes an HTTP request to the location of defaultImage (which is the imported path to your image file).
     * await is used to wait for the request to complete and for the response to be returned. This prevents the code from continuing until the image has been successfully fetched.
     * response is the result of this fetch operation, which contains various properties and methods for handling the data, like json(), text(), or blob().
     */
    // #endregion
    const response = await fetch(defaultImage);

    // #region Multi-line Comment
    /**
     * This line converts the response object into a Binary Large Object (Blob), which represents the image data.
     * response.blob() is a method that reads the response body and returns it as a Blob object, which is useful for handling file-like data such as images or videos.
     * await ensures that the code waits for this conversion to complete before proceeding.
     */
    // #endregion
    const blob = await response.blob();

    // #region Multi-line Comment
    /**
     * This line creates a new File object from the Blob.
     * new File([blob], "note-creator-square-logo.jpeg", { type: blob.type }) creates a file with the following parameters:
     * 
     * [blob]: The content of the file, which in this case is the Blob object created in the previous line.
     * "note-creator-square-logo.jpeg": The name of the file we're creating, which will be used when handling it in the backend.
     * { type: blob.type }: The MIME type of the file, which is automatically set to match the type of the Blob (e.g., image/jpeg).
     * This File object can now be treated like a file selected by a user in a file input field, making it possible to upload or manipulate it as needed.
     */
    // #endregion
    const file = new File([blob], "note-creator-square-logo.jpeg", {
      type: blob.type,
    });

    // #region Multi-line Comment
    /**
     * This line returns the File object created from the Blob.
     * When the fetchDefaultImageFile function is called, it will return a Promise that resolves to this File object.
     * The returned File object can then be used wherever a file is needed, such as uploading it to a server or attaching it to a form.
     */
    // #endregion
    return file;
  };

  // #region uploadFile function section
  // #region uploadFile function
  /**
   * Uploading the file.
   * The uploadFile function handles the process of uploading a file to the server.
   * It packages the file into a FormData object, sends it to the server via a POST request, and then updates the component's state with the path to the uploaded file, as returned by the server.
   * This function allows the user to upload an image and have its path stored in the noteDetails state.
   * Sends the file to the backend, which would handle saving the image and returning the path.
   * const uploadFile = async (file) => { ... }: This line declares an asynchronous function named uploadFile that takes a single parameter, file.
   * The async keyword allows the use of await within the function to handle asynchronous operations.
   */
  // #endregion
  // const uploadFile = async (file) => {

    // #region Multi-line Comment
    /**
     * This line creates a new instance of the FormData object.
     * FormData is a web API that provides a way to construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the fetch or XMLHttpRequest API.
     * It is commonly used for sending files and other binary data in an HTTP request.
     */
    // #endregion
    // const formData = new FormData();

    // #region Multi-line Comment
    /**
     * This line appends a key-value pair to the FormData object.
     * "noteImage" is the name of the field that will be sent to the server, and file is the value associated with this key. In this context, file is the image file that we want to upload.
     * When the form data is sent to the server, it will include a field named "noteImage" containing the file data.
     */
    // #endregion
    // formData.append("noteImage", file);

    // #region Multi-line Comment
    /**
     * This line sends an HTTP POST request to the server using the fetch API.
     * The await keyword is used to wait for the request to complete and for the response to be returned before moving on to the next line of code.
     * "/api/upload" is the URL endpoint on the server where the file will be uploaded.
     * 
     * The fetch function is configured with an options object:
     * method: "POST": Specifies that the request will be a POST request, which is typically used for creating or uploading data.
     * body: formData: The body of the request contains the formData object, which includes the file we want to upload.
     */
    // #endregion
    /* const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    }); */

    // #region Multi-line Comment
    /**
     * This line parses the response from the server as JSON.
     * response.json() is a method that reads the response body and parses it as JSON.
     * The await keyword ensures that the code waits for the parsing to complete before moving on.
     * The parsed JSON data is stored in the data variable, which typically contains information returned by the server, such as the file path of the uploaded image.
     */
    // #endregion
    // const data = await response.json();

    // #region Multi-line Comment
    /**
     * This line updates the noteDetails state with the new image path returned from the server.
     * ...noteDetails: This spreads the existing properties of the noteDetails object into the new object, ensuring that all other fields remain unchanged.
     * noteImage: data.filePath: This updates the noteImage property of noteDetails with the file path returned by the server (stored in data.filePath).
     * The setNoteDetails function is then called with the updated state, which causes React to re-render any components that depend on noteDetails.
     */
    // #endregion
    /* setNoteDetails({
      ...noteDetails,
      noteImage: data.filePath,
    });
  }; */
  // #endregion

  const handleFile = async (e) => {
    console.log(e);
    console.log(e.target.files);
    console.log(e.target.files[0]);
    console.log("e.target.files[0]: ", e.target.files[0]);
    setNoteDetails({
      ...noteDetails,
      noteImage: e.target.files[0],
    });

    // #region fetchDefaultImageFile() file upload section
    /* let file;

    if (e.target.files[0]) {
      file = e.target.files[0];

      // If no file selected, use the default image file
    } else {
      file = await fetchDefaultImageFile();
    }

    // Function to handle the file upload
    uploadFile(file);

    setNoteDetails({
      ...noteDetails,
      noteImage: file,
    }); */
    // #endregion 
  };

  const onSaveNoteClicked = async () => {
    noteDetails.noteTitle = noteFormState.noteTitle;
    noteDetails.noteContent = noteFormState.noteContent;
    noteDetails.noteDate = noteFormState.noteDate;

    if (!titleError && !contentError) {

      // #region Multi-line Comment
      /**
       * Using object destructuring to extract the values for noteTitle, noteContent, noteImage, and noteDate from the noteDetails object.
       */
      // #endregion
      const { noteTitle, noteContent, noteImage, noteDate } = noteDetails;
      console.log("noteFormState: ", noteFormState);
      console.log("noteTitle: ", noteTitle);
      console.log("noteContent: ", noteContent);
      console.log("noteDate: ", noteDate);

      if (noteDetails.noteImage) {
        console.log("noteImage: ", noteImage);
        setImageSet(true);
      } else {
        const defaultImageFileObject = await fetchDefaultImageFile();
        console.log("defaultImageFileObject: ", defaultImageFileObject);

        await setNoteDetails((prevNoteDetails) => ({
          ...prevNoteDetails,
          noteImage: defaultImageFileObject,
        }));
        setImageSet(true);
      }
    }
  };

  const onSaveNoteClicked_2 = async () => {
    
    // #region Multi-line Comment
    /**
     * Accessing the updated state after awaiting setNoteDetails.
     */
    // #endregion
    const { noteTitle, noteContent, noteImage, noteDate } = noteDetails;
    console.log("noteDetails.noteImage before IF check: ", noteImage);

    // #region Multi-line Comment
    /**
     * If statement checks if any of the required fields (noteTitle, noteContent, noteImage, noteDate) are empty.
     * If any field is missing, it triggers an alert to inform the user to complete the form.
     */
    // #endregion
    if (!noteTitle || !noteContent || !noteImage || !noteDate) {
      alert("Please fill the form completely.");
    } else {
      
      // #region Multi-line Comment
      /**
       * A FormData object is created, which is used to construct a set of key/value pairs representing form fields and their values.
       * This is particularly useful for sending data that includes files (like images) via HTTP requests.
       */
      // #endregion
      const reqBody = new FormData();

      // #region Multi-line Comment
      /**
       * append() - adds data to the object.
       * Each line appends a piece of data to the FormData object. This includes the form field names (noteTitle, noteContent, etc.) and their corresponding values.
       * The append() method adds key-value pairs to the FormData object, where the key is the form field name and the value is the content of the field.
       */
      // #endregion
      reqBody.append("noteTitle", noteTitle); // Postman Body > form-data
      reqBody.append("noteContent", noteContent); // Postman Body > form-data
      reqBody.append("noteImage", noteImage); // Postman Body > form-data
      reqBody.append("noteDate", noteDate); // Postman Body > form-data

      // #region Multi-line Comment
      /**
       * Retrieves a token from the browser's sessionStorage.
       * The token is used for authentication, verifying that the user is allowed to perform the action (adding a note).
       */
      // #endregion
      const token = sessionStorage.getItem("token");

      // #region Multi-line Comment
      /**
       * This checks whether the token was successfully retrieved from sessionStorage.
       * If the token exists, it proceeds to set the request headers and send the data.
       */
      // #endregion
      if (token) {

        // #region Multi-line Comment
        /**
         * This defines the headers for the HTTP request.
         * "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
         * Select form-data in body section in Postman.
         * Bearer - No other certificate is required to verify this token.
         * iat : Time at which token is generated.
         */
        // #endregion
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        console.log('key, before note was added: ', key)

        // #region Multi-line Comment
        /**
         * Calls the addNoteOfAUserApi(), passing in the reqBody (form data) and reqHeader (headers).
         */
        // #endregion
        const result = await addNoteOfAUserApi(reqBody, reqHeader);
        console.log(
          "Result of the addNoteOfAUserApi call to the console: ",
          result
        );

        if (result.status == 200) {
          toast.success("Note added successfully.");
          dispatch(resetNoteFormState());
          setPreview("");          
          if (key == false) {
            setKey(true);
          } else {
            setKey(false);
          }
          console.log('key, after note was added: ', key)
          setImageSet(false);
          setTitleError(false)
          setContentError(false)
        } else {
          toast.error("Something went wrong.");
          dispatch(resetNoteFormState());
          setPreview("");
          if (key == false) {
            setKey(true);
          } else {
            setKey(false);
          }
          setImageSet(false)
          setTitleError(false)
          setContentError(false)
        }
      }
    }
  };

  useEffect(() => {
    console.log("noteDetails.noteImage: ", noteDetails.noteImage);
    if (noteDetails.noteImage !== "") {
      setPreview(URL.createObjectURL(noteDetails.noteImage));
      console.log(
        "URL.createObjectURL(noteDetails.noteImage): ",
        URL.createObjectURL(noteDetails.noteImage)
      );
    }
  }, [noteDetails.noteImage]);

  useEffect(() => {
    if (imageSet) {
      onSaveNoteClicked_2();
    }
  }, [imageSet]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
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
                  src={preview ? preview : defaultImage}
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
    </>
  );
}

export default AddNoteForm;
