import { createSlice } from "@reduxjs/toolkit";

type Note = {
  _id?: string;
  noteTitle?: string;
  noteContent?: string;
  noteDate?: string;
  noteImage?: string;
};

type NoteFormState = {
  noteTitle: string;
  noteContent: string;
  noteImage: string | File | null;
  noteDate: string;
};

type NoteState = {
  notes: Note[];
  noteFormState: NoteFormState;
};

const initialState: NoteState = {
  notes: [],
  noteFormState: {
    noteTitle: "",
    noteContent: "",
    noteImage: "",
    noteDate: "",
  },
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    updateNotes: (state, action) => {
      state.notes = action.payload;
    },
    updateNoteFormState: (state, action) => {
      state.noteFormState = { ...state.noteFormState, ...action.payload };
    },
    resetNoteFormState: (state) => {
      state.noteFormState = initialState.noteFormState;
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNotes,
  updateNoteFormState,
  resetNoteFormState,
} = noteSlice.actions;
export default noteSlice.reducer;
