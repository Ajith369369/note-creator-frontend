import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import HomePage from "./pages/HomePage";
import Notes from "./pages/Notes";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Auth register/>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile-home" element={<HomePage />} />
        <Route path="/home" element={<Notes />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/edit" element={<EditNote />} />
      </Routes>
    </>
  );
}

export default App;
