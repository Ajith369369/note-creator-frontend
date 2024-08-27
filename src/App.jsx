import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import HomePage from "./pages/HomePage";
import Notes from "./pages/Notes";
import Auth from "./pages/Auth";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Auth register/>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/home" element={<Notes />} />
        <Route path="/profile-home" element={<HomePage />} >
          <Route path="/profile-home/notes" element={<NotesPage />} />
          <Route path="/profile-home/add" element={<AddNote />} />
          <Route path="/profile-home/edit" element={<EditNote />} />
          {/* <Route path = "/note/:id" element = {<SingleNote />} /> */}
          </Route>
      </Routes>
    </>
  );
}

export default App;
