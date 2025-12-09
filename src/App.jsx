import Admin from "@/admin/Admin";
import { Introduction, Layout } from "@/components/shared";
import AddNote from "@/pages/add-note/AddNote";
import Auth from "@/pages/Auth";
import EditNote from "@/pages/edit-note/EditNote";
import Home from "@/pages/Home";
import NotesPage from "@/pages/notes-page/NotesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ViewNote from "@/pages/ViewNote";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile-home" element={<Layout />}>
          <Route path="/profile-home/admin" element={<Admin />} />
          <Route path="/profile-home/introduction" element={<Introduction />} />
          <Route path="/profile-home/notes" element={<NotesPage />} />
          <Route path="/profile-home/add" element={<AddNote />} />
          <Route path="/profile-home/edit" element={<EditNote />} />
          <Route path="/profile-home/note" element={<ViewNote />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
