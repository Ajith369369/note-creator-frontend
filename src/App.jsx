import HomePage from "./pages/HomePage";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Notes />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/edit" element={<EditNote />} />
      </Routes>
    </>
  );
}

export default App;
