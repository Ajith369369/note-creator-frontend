import React from 'react'
import { useSelector} from "react-redux";
note

function NotesPage() {
  const notes = useSelector(getAllNotes);
  return (
    <>
    <NotesList notes = {notes} />
    </>
  )
}

export default NotesPage