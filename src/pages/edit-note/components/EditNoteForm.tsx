import { editNoteOfAUserApi } from "@/services/api";
import { serverUrl } from "@/services/nc_serverUrl";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NoteDetails = {
  noteTitle?: string;
  noteContent?: string;
  noteDate?: string;
  noteImage?: File | string | null;
  _id?: string;
};

function EditNoteForm() {
  const location = useLocation();
  const selectedNote = (location.state as { selectedNote?: NoteDetails } | null)
    ?.selectedNote;
  const navigate = useNavigate();

  const [titleError] = useState(false);
  const [contentError] = useState(false);
  const [canSave] = useState(true);
  const [noteDetails, setNoteDetails] = useState<NoteDetails>(() => {
    const initial: NoteDetails = { noteImage: "" };
    if (selectedNote) {
      if (selectedNote.noteTitle !== undefined) {
        initial.noteTitle = selectedNote.noteTitle;
      }
      if (selectedNote.noteContent !== undefined) {
        initial.noteContent = selectedNote.noteContent;
      }
      if (selectedNote.noteDate !== undefined) {
        initial.noteDate = selectedNote.noteDate;
      }
    }
    return initial;
  });

  // Derive preview URL from noteImage using useMemo
  const preview = useMemo(() => {
    if (noteDetails.noteImage && typeof noteDetails.noteImage !== "string") {
      return URL.createObjectURL(noteDetails.noteImage);
    }
    return "";
  }, [noteDetails.noteImage]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNoteDetails((prev) => ({
      ...prev,
      noteImage: file,
    }));
  };

  // Cleanup object URL when preview changes or component unmounts
  useEffect(() => {
    if (preview) {
      return () => {
        URL.revokeObjectURL(preview);
      };
    }
  }, [preview]);

  const onSaveNoteClicked = async () => {
    window.scrollTo(0, 0);
    const { noteTitle, noteContent, noteImage, noteDate } = noteDetails;
    if (!noteTitle || !noteContent || !noteDate) {
      toast.info("Please fill the form completely.");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("noteTitle", noteTitle as string);
    reqBody.append("noteContent", noteContent as string);
    reqBody.append("noteDate", noteDate as string);
    if (preview && noteImage && typeof noteImage !== "string") {
      reqBody.append("noteImage", noteImage);
    } else if (
      selectedNote?.noteImage &&
      typeof selectedNote.noteImage !== "string"
    ) {
      reqBody.append("noteImage", selectedNote.noteImage);
    }

    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader =
      preview && noteImage
        ? {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

    const noteId = selectedNote?._id;
    if (!noteId) {
      toast.error("Note ID is missing.");
      return;
    }

    const result = await editNoteOfAUserApi(noteId, reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Note updated successfully.", {
        onClose: () => navigate("/profile-home/notes"),
      });
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">
            Edit note
          </p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Refresh your story with elegance
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-200/80">
            Update your note with a calm, luxurious workspace that keeps focus
            on the words while your ideas stay beautifully framed.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg backdrop-blur">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-400 opacity-90 shadow-inner"></div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-emerald-100/80">
              Last touched
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
              onChange={(e) =>
                setNoteDetails({
                  ...noteDetails,
                  noteTitle: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/60 shadow-inner outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/30"
              value={noteDetails.noteTitle || ""}
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
                  onChange={handleFile}
                />
              </label>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner">
              <img
                src={
                  preview
                    ? preview
                    : `${serverUrl}/uploads/${selectedNote?.noteImage || ""}`
                }
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
                onChange={(e) =>
                  setNoteDetails({
                    ...noteDetails,
                    noteContent: e.target.value,
                  })
                }
                className="w-full resize-none rounded-2xl bg-transparent px-4 py-3 text-base text-white placeholder:text-white/60 outline-none"
                rows={10}
                value={noteDetails.noteContent || ""}
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
                Update Note
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
              Glide through a live preview of your note cover. Swapping images
              keeps your story visually polished.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner">
              <img
                src={
                  preview
                    ? preview
                    : `${serverUrl}/uploads/${selectedNote?.noteImage || ""}`
                }
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
              Short titles and focused paragraphs help your note stay elegant.
              Keep imagery high-quality for a refined finish.
            </p>
          </div>
        </aside>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={1000} />
    </div>
  );
}

export default EditNoteForm;
