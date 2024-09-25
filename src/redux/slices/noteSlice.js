import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuid } from "uuid";

const initialState = {
  // #region Multi-line Comment
  /**
   * Manages the state associated with the Administator.
   */
  // #endregion
  adminFormState: {
    // #region Multi-line Comment
    /**
     * loginUser: false,
     */
    // #endregion
    loginAdmin: false,
  },

  notes: [],
  noteFormState: {
    noteTitle: "",
    noteContent: "",
    noteDate: "",
    noteImage: "",
    noteUserId: "",
  },
};

const noteSlice = createSlice({
  // #region Multi-line Comment
  /**
   * name: "noteDetails",: Name of the slice.
   */
  // #endregion
  name: "noteDetails",
  initialState,
  reducers: {
    updateAdminFormState(state, action) {
      state.adminFormState = { ...state.adminFormState, ...action.payload };
    },

    updateNoteFormState(state, action) {
      // #region Multi-line Comment
      /**
       * state.noteFormState is spread into a new object { ...state.noteFormState }, which copies all existing properties.
       * ...action.payload spreads the properties of the payload object into this new state, overriding any existing properties with the same name.
       */
      // #endregion
      state.noteFormState = { ...state.noteFormState, ...action.payload };
      const newState = state.noteFormState;
      newState.noteDate = new Date().toISOString();
      state.noteFormState = newState;
    },

    updateNotes(state, action) {
      state.notes = action.payload;
    },

    resetNoteFormState(state) {
      state.noteFormState = initialState.noteFormState;
    },

    // #region Reducer examples
    /**
     *  addNewNote(state, action) {
          const newState = { ...state.noteFormState, ...action.payload };
          newState.noteDate = new Date().toISOString();
          state.noteFormState = newState;
          state.notes.push(newPost);
        }
     * 
     *  addNewNote(state, action) {
          const { noteTitle, noteContent } = action.payload;
          let noteId = uuid();
          let newPost = { noteId, noteTitle, noteContent };
          newPost.noteDate = new Date().toISOString();
          state.notes.push(newPost);
          storeInLocalStorage("notes", state.notes);
        }
     * 
     *  editNote(state, action) {
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
        }
     *         
     *  editNote(state, action) {
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
        }
     * 
     *  removeNote(state, action) {
          const tempId = action.payload;
          const tempNotes = state.notes.filter((note) => note.noteId !== tempId);
          state.notes = tempNotes;
          storeInLocalStorage("notes", tempNotes);
        }
     *  
     *  increaseCount(state, action) {
          state.count = state.count + 1;
        }
     */
    // #endregion
  },
});

export const {
  updateAdminFormState,
  updateNoteFormState,
  resetNoteFormState,
  updateNotes,
} = noteSlice.actions;
export const getAllNotes = (state) => state.notes.notes;
export default noteSlice.reducer;
