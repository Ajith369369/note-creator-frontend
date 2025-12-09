import defaultImage from "@/assets/images/note-creator-square-logo.jpeg";
import {
  resetNoteFormState,
  updateNoteFormState,
} from "@/redux/slices/noteSlice";
import { addNoteOfAUserApi } from "@/services/nc_allApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    window.scrollTo(0, 0);
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

        console.log("key, before note was added: ", key);

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
          noteDetails.noteImage = "";
          setPreview("");
          if (key == false) {
            setKey(true);
          } else {
            setKey(false);
          }
          console.log("key, after note was added: ", key);
          setImageSet(false);
          setTitleError(false);
          setContentError(false);
        } else {
          toast.error("Something went wrong.");
          dispatch(resetNoteFormState());
          noteDetails.noteImage = "";
          setPreview("");
          if (key == false) {
            setKey(true);
          } else {
            setKey(false);
          }
          setImageSet(false);
          setTitleError(false);
          setContentError(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSet]);

  return (
    <>
      <div className="relative z-10 text-white">
        <section className="flex flex-col gap-10 px-4 py-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200">
              Add Note
            </span>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Craft a beautiful, lasting memory
                </h2>
                <p className="max-w-3xl text-sm text-slate-200/85 sm:text-base">
                  Give your note a strong title, a vivid description, and a
                  cover that stands out. Everything saves with rich formatting
                  and a modern card aesthetic.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-200/70 sm:text-sm lg:w-80">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur">
                  <p className="font-semibold text-emerald-200">Live preview</p>
                  <p>See your cover update instantly while you type.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur">
                  <p className="font-semibold text-emerald-200">Secure save</p>
                  <p>Protected upload with graceful error handling.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <form className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="space-y-2">
                <label
                  htmlFor="noteTitle"
                  className="block text-sm font-semibold text-emerald-100"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="noteTitle"
                  name="noteTitle"
                  placeholder="Name your note with intent..."
                  onChange={(e) => onFormDataChange(e)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner focus:border-emerald-300/80 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
                  value={noteFormState.noteTitle}
                />
                <span className="text-sm text-rose-300">
                  {titleError ? "Title can't be empty!" : ""}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="noteImg"
                    className="text-sm font-semibold text-emerald-100"
                  >
                    Cover Image
                  </label>
                  <p className="text-xs text-slate-200/70">
                    JPG, PNG up to 3MB
                  </p>
                </div>
                <label
                  htmlFor="noteImg"
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-dashed border-emerald-300/50 bg-white/5 p-4 transition duration-300 hover:border-emerald-200 hover:bg-emerald-400/5"
                >
                  <input
                    type="file"
                    id="noteImg"
                    className="hidden"
                    key={key}
                    onChange={(e) => handleFile(e)}
                  />
                  <div className="flex items-center gap-4">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-inner">
                      <img
                        src={preview ? preview : defaultImage}
                        alt="Note cover preview"
                        className="h-28 w-28 object-contain transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-white">
                        Drop or click to upload
                      </span>
                      <span className="text-xs text-slate-200/70">
                        A strong cover makes the note unforgettable.
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="noteContent"
                  className="block text-sm font-semibold text-emerald-100"
                >
                  Content
                </label>
                <div className="rounded-2xl border border-white/10 bg-white/5 shadow-inner focus-within:border-emerald-300/80 focus-within:ring-4 focus-within:ring-emerald-400/20">
                  <textarea
                    id="noteContent"
                    name="noteContent"
                    placeholder="Pour your thoughts, plans, or ideas..."
                    onChange={(e) => onFormDataChange(e)}
                    className="h-56 w-full resize-none rounded-2xl bg-transparent px-4 py-3 text-base text-white placeholder:text-slate-200/60 focus:outline-none"
                    value={noteFormState.noteContent}
                  ></textarea>
                </div>
                <span className="text-sm text-rose-300">
                  {contentError ? "Content can't be empty!" : ""}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onSaveNoteClicked}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition duration-300 hover:translate-y-[1px] hover:shadow-xl hover:shadow-emerald-500/35 focus:outline-none focus:ring-4 focus:ring-emerald-300/60 disabled:from-slate-500 disabled:via-slate-500 disabled:to-slate-500 disabled:text-slate-200 disabled:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                  disabled={!canSave}
                >
                  Save Note
                </button>
                <span className="text-xs text-slate-200/70">
                  Autosaving kicks in after a cover or content update.
                </span>
              </div>
              <ToastContainer
                position="top-center"
                theme="colored"
                autoclose={3000}
              />
            </form>

            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-slate-900/60 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Live Preview
                </p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-emerald-100">
                  Modern Card
                </span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                <img
                  src={preview ? preview : defaultImage}
                  alt="Preview"
                  className="aspect-video w-full object-contain bg-black/30"
                />
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner">
                <p className="text-lg font-semibold text-white">
                  {noteFormState.noteTitle || "Title appears here"}
                </p>
                <p className="mt-2 max-h-32 overflow-hidden text-sm text-slate-200/80">
                  {noteFormState.noteContent ||
                    "Start writing to see your story come alive."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddNoteForm;
