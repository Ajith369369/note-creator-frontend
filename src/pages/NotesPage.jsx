import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noteCreatorLogo from "../assets/images/note-creator-square-logo.jpeg";
import NotesList from "../components/NotesList";
import { updateNotes } from "../redux/slices/noteSlice";
import { getAllNotesOfAUserApi } from "../services/nc_allApi";
import useAuthGuard from "./useAuthGuard";

function NotesPage() {
  // Check if user is authenticated
  useAuthGuard();

  const [isToken, setIsToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [allnotes, setAllNotes] = useState([]);

  const dispatch = useDispatch();
  const notesFromNoteSlice = useSelector((state) => state.noteDetails.notes);

  const getAllNotesOfAUser = async (searchKey) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        // "Content-Type": "application/json" is used to send requests without uploaded content.
        // Select form-data in body section in Postman.
        // Bearer - No other certificate is required to verify this token.
        // iat : Time atwhich token is generated.
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllNotesOfAUserApi(searchKey, reqHeader);
      setAllNotes(result.data);
      dispatch(updateNotes(result.data));
    }

    /* if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await getAllNotesOfAUserApi(searchKey, reqHeader);
      console.log(result);
      if (result.status === 200) {
        setAllNotes(result.data);
      } else {
        console.log(result);
      }
    } */
  };

  console.log("searchKey: ", searchKey);
  console.log("allnotes: ", allnotes);
  console.log("notesFromNoteSlice: ", notesFromNoteSlice);

  useEffect(() => {
    getAllNotesOfAUser(searchKey);
  }, [searchKey]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      {isToken ? (
        <div>
          <div className="grid grid-cols-12 gap-4 my-4">
            <div className="col-span-12 md:col-span-4"></div>
            <div className="col-span-12 md:col-span-4 flex relative">
              <input
                type="text"
                className="w-full px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-salsa"
                placeholder="Note Title"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                rotation={90}
                className="absolute right-3 top-3 text-gray-500"
              />
            </div>
            <div className="col-span-12 md:col-span-4"></div>
          </div>
          <NotesList notes={notesFromNoteSlice} />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 mt-12 w-full">
          <div className="col-span-12 md:col-span-4"></div>
          <div className="col-span-12 md:col-span-4 p-4 flex flex-col justify-center items-center">
            <img src={noteCreatorLogo} alt="" className="w-3/4 h-72 object-cover" />
            <h4 className="mt-12 text-center">
              Please{" "}
              <Link to={"/login"} className="text-red-600">
                Login
              </Link>{" "}
              to see the notes.
            </h4>
          </div>
          <div className="col-span-12 md:col-span-4"></div>
        </div>
      )}
    </>
  );
}

export default NotesPage;
