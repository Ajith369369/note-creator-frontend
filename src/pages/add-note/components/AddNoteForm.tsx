import defaultImage from "@/assets/images/note-creator-square-logo.jpeg";
import {
  resetNoteFormState,
  updateNoteFormState,
} from "@/redux/slices/noteSlice";
import { addNoteOfAUserApi } from "@/services/api";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NoteFormState = {
  noteTitle: string;
  noteContent: string;
  noteImage: File | string | null;
  noteDate: string;
};

type RootState = {
  noteDetails: {
    noteFormState: NoteFormState;
  };
};

function AddNoteForm() {
  const dispatch = useDispatch();
  const noteFormState = useSelector(
    (state: RootState) => state.noteDetails.noteFormState
  );

  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [key, setKey] = useState(false);
  const [imageSet, setImageSet] = useState(false);

  const formatDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  // Initialize noteDetails with current date using lazy initializer
  const [noteDetails, setNoteDetails] = useState<NoteFormState>(() => ({
    noteTitle: "",
    noteContent: "",
    noteImage: "",
    noteDate: formatDate(),
  }));

  const onFormDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "noteTitle") {
      setTitleError(value.length === 0);
      if (value.length > 0) setCanSave(true);
    }

    if (name === "noteContent") {
      setContentError(value.length === 0);
      if (value.length > 0) setCanSave(true);
    }
    dispatch(updateNoteFormState({ [name]: value } as Partial<NoteFormState>));
  };

  const fetchDefaultImageFile = async () => {
    const response = await fetch(defaultImage);
    const blob = await response.blob();
    const file = new File([blob], "note-creator-square-logo.jpeg", {
      type: blob.type,
    });
    return file;
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNoteDetails((prevData) => ({
        ...prevData,
        noteImage: file,
      }));
      setImageSet(true);
      setPreview(URL.createObjectURL(file));
    } else {
      const defaultFile = await fetchDefaultImageFile();
      setNoteDetails((prevData) => ({
        ...prevData,
        noteImage: defaultFile,
      }));
      setImageSet(true);
      setPreview(URL.createObjectURL(defaultFile));
    }
    setKey((prevKey) => !prevKey);
  };

  useEffect(() => {
    if (noteFormState) {
      setNoteDetails((prev) => ({
        ...prev,
        ...noteFormState,
      }));
    }
  }, [noteFormState]);

  useEffect(() => {
    if (noteDetails.noteImage) {
      if (noteDetails.noteImage instanceof File) {
        setPreview(URL.createObjectURL(noteDetails.noteImage));
      } else if (typeof noteDetails.noteImage === "string") {
        setPreview(noteDetails.noteImage);
      }
    }
  }, [noteDetails.noteImage]);

  // Sync initial date to Redux store on mount
  useEffect(() => {
    const currentDate = formatDate();
    dispatch(updateNoteFormState({ noteDate: currentDate }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (noteDetails.noteTitle && noteDetails.noteContent) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [noteDetails.noteTitle, noteDetails.noteContent]);

  const onSaveNoteClicked = async () => {
    if (!noteDetails.noteTitle || !noteDetails.noteContent) {
      toast.info("Please fill the form completely.");
      return;
    }
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqBody = new FormData();
      reqBody.append("noteTitle", noteDetails.noteTitle);
      reqBody.append("noteContent", noteDetails.noteContent);
      reqBody.append("noteDate", noteDetails.noteDate);
      if (noteDetails.noteImage instanceof File) {
        reqBody.append("noteImage", noteDetails.noteImage);
      } else {
        const defaultFile = await fetchDefaultImageFile();
        reqBody.append("noteImage", defaultFile);
      }

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const result = await addNoteOfAUserApi(reqBody, reqHeader);
      if (result.status === 200) {
        toast.success("Note added successfully");
        setNoteDetails({
          noteTitle: "",
          noteContent: "",
          noteImage: "",
          noteDate: formatDate(),
        });
        setPreview("");
        dispatch(resetNoteFormState());
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-black text-white min-h-[80vh] px-4 py-12 sm:px-10 lg:px-14 shadow-2xl rounded-3xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"></div>
          <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute left-1/2 bottom-0 h-40 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl space-y-8">
          <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">
                Add note
              </p>
              <h1 className="mt-1 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Capture ideas with elegance
              </h1>
              <p className="mt-3 max-w-3xl text-base text-slate-200/80">
                Create a stunning note with visuals, thoughtful typography, and
                a calm, focused layout.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg backdrop-blur">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-400 opacity-90 shadow-inner"></div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-emerald-100/80">
                  Date
                </p>
                <p className="text-sm font-medium text-white">
                  {noteDetails.noteDate || "—"}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
            <form className="lg:col-span-3 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <div className="space-y-2">
                <label
                  htmlFor="noteTitle"
                  className="block text-sm font-semibold tracking-wide text-emerald-100"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="noteTitle"
                  name="noteTitle"
                  placeholder="Name this note with intention..."
                  onChange={onFormDataChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/60 shadow-inner outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/30"
                  value={noteDetails.noteTitle}
                />
                <span className="text-xs text-rose-300/90">
                  {titleError ? "Title can't be empty!" : ""}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="noteImg"
                    className="text-sm font-semibold tracking-wide text-emerald-100"
                  >
                    Cover Image
                  </label>
                  <label
                    htmlFor="noteImg"
                    className="cursor-pointer rounded-full border border-emerald-200/40 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-100 hover:bg-emerald-200/20"
                  >
                    Upload
                    <input
                      type="file"
                      id="noteImg"
                      className="hidden"
                      key={String(key)}
                      onChange={handleFile}
                    />
                  </label>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner">
                  <img
                    src={preview || defaultImage}
                    alt="Note cover"
                    className="h-48 w-full rounded-xl object-cover shadow-lg transition duration-500 hover:scale-[1.01]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="noteContent"
                  className="block text-sm font-semibold tracking-wide text-emerald-100"
                >
                  Content
                </label>
                <div className="rounded-2xl border border-white/10 bg-white/5 shadow-inner focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-300/20">
                  <textarea
                    id="noteContent"
                    name="noteContent"
                    placeholder="Write with ease. Rich ideas deserve a tranquil canvas..."
                    onChange={onFormDataChange}
                    className="w-full resize-none rounded-2xl bg-transparent px-4 py-3 text-base text-white placeholder:text-white/60 outline-none"
                    rows={10}
                    value={noteDetails.noteContent}
                  ></textarea>
                </div>
                <span className="text-xs text-rose-300/90">
                  {contentError ? "Content can't be empty!" : ""}
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-200/80">
                  Save your changes to keep this note shimmering.
                </p>
                <button
                  type="button"
                  onClick={onSaveNoteClicked}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-400/40 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!canSave}
                >
                  <span className="transition group-hover:translate-x-0.5">
                    Save Note
                  </span>
                  <span className="text-lg leading-none transition group-hover:translate-x-0.5">
                    ↗
                  </span>
                </button>
              </div>
            </form>

            <aside className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white">Preview</h3>
                <p className="mt-2 text-sm text-slate-200/80">
                  Glide through a live preview of your note cover. Swapping
                  images keeps your story visually polished.
                </p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner">
                  <img
                    src={preview || defaultImage}
                    alt="Note preview"
                    className="h-56 w-full rounded-xl object-cover shadow-lg"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-xl backdrop-blur">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-100/80">
                  Tip
                </p>
                <p className="mt-2 text-base text-white">
                  Short titles and focused paragraphs help your note stay
                  elegant. Keep imagery high-quality for a refined finish.
                </p>
              </div>
            </aside>
          </div>

          <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={1000}
          />
        </div>
      </section>
    </>
  );
}

export default AddNoteForm;
