import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuid } from "uuid";
// import {storeInLocalStorage, fetchFromLocalStorage} from "../../utils/helpers";

const initialState = {
  // notes: fetchFromLocalStorage('notes'),
  // notes: null,
  // error: null,
  // count: 0,

  notes: {
        notes: [], // the array of notes
        error: null,
        count: 0
    },

  noteFormState: {
    noteTitle: "",
    noteContent: "",
    noteDate: "",
  },
};

const noteSlice = createSlice({
  name: "noteDetails",
  initialState,
  reducers: {
    updateNoteFormState(state, action) {

      // state.noteFormState is spread into a new object { ...state.noteFormState }, which copies all existing properties.
      // ...action.payload spreads the properties of the payload object into this new state, overriding any existing properties with the same name.
      state.noteFormState = { ...state.noteFormState, ...action.payload };
      const newState = state.noteFormState
      newState.noteDate = new Date().toISOString();
      state.noteFormState = newState;
    },

    resetNoteFormState(state) {
      state.noteFormState = initialState.noteFormState;
    },

    addNewNote(state, action) {
      const newState = { ...state.noteFormState, ...action.payload };
      newState.noteDate = new Date().toISOString();
      state.noteFormState = newState;
      // state.notes.push(newPost);
    },
    /* addNewNote(state, action) {
      const { noteTitle, noteContent } = action.payload;
      // let noteId = uuid();
      let newPost = { noteId, noteTitle, noteContent };
      newPost.noteDate = new Date().toISOString();
      state.notes.push(newPost);
      storeInLocalStorage("notes", state.notes);
    }, */

    removeNote(state, action) {
      const tempId = action.payload;
      const tempNotes = state.notes.filter((note) => note.noteId !== tempId);
      state.notes = tempNotes;
    },
    /* removeNote(state, action) {
      const tempId = action.payload;
      const tempNotes = state.notes.filter((note) => note.noteId !== tempId);
      state.notes = tempNotes;
      storeInLocalStorage("notes", tempNotes);
    }, */

    editNote(state, action) {
      const newEditState = { ...state.noteFormState, ...action.payload };
      const tempNotes = state.notes.map((note) => {
        if (note.noteId === newEditState.noteId) {
          note.noteTitle = newEditState.noteTitle;
          note.noteContent = newEditState.noteContent;
          note.noteDate = new Date().toISOString();
        }
        return note;
      });

      state.note = tempNotes;
    },
    /* editNote(state, action) {
      const { noteId, noteTitle, noteContent } = action.payload;
      const tempNotes = state.notes.map((note) => {
        if (note.noteId === noteId) {
          note.noteTitle = noteTitle;
          note.noteContent = noteContent;
          note.noteDate = new Date().toISOString();
        }
        return note;
      });

      state.note = tempNotes;
      storeInLocalStorage("notes", tempNotes);
    }, */

    increaseCount(state, action) {
      state.count = state.count + 1;
    },
  },
});

export const { updateNoteFormState, resetNoteFormState, addNewNote, removeNote, editNote } = noteSlice.actions;
export const getAllNotes = (state) => state.notes.notes;
export default noteSlice.reducer;
