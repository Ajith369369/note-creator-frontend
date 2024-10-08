import { Route, Routes } from "react-router-dom";
import SingleNote from "./components/SingleNote";
import "./App.scss";
import AddNote from "./pages/AddNote";
import Auth from "./pages/Auth";
import EditNote from "./pages/EditNote";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import Introduction from "./components/Introduction";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./admin/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile-home" element={<HomePage />}>
          <Route path="/profile-home/admin" element={<Admin />} />
          <Route path="/profile-home/introduction" element={<Introduction />} />
          <Route path="/profile-home/notes" element={<NotesPage />} />
          <Route path="/profile-home/add" element={<AddNote />} />
          <Route path="/profile-home/edit" element={<EditNote />} />
          <Route path="/profile-home/note" element={<SingleNote />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
