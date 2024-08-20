import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import NotesList from "../components/NotesList";
import { getAllNotesOfAUserApi } from "../services/nc_allApi";

function NotesPage() {
  const [searchKey, setSearchKey] = useState("");
  const [allnotes, setAllNotes] = useState([]);

  const getAllNotesOfAUser = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllNotesOfAUserApi(searchKey, reqHeader);
      console.log(result);
      if (result.status === 200) {
        setAllNotes(result.data);
      } else {
        console.log(result);
      }
    }
  };
  console.log(searchKey);

  useEffect(() => {
    getAllNotesOfAUser();
  }, [searchKey]);
  return (
    <>
      <div className="row my-4">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Note Title"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            rotation={90}
            style={{
              marginTop: "12px",
              marginLeft: "-30px",
              color: "grey",
            }}
          />
        </div>
        <div className="col-md-4"></div>
      </div>
      <NotesList notes={allnotes} />
    </>
  );
}

export default NotesPage;
