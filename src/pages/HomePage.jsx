import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./HomePage.scss";
import { updateAdminFormState } from "../redux/slices/noteSlice";
import { useDispatch } from "react-redux";

function HomePage() {
  // State Initialization: This initializes state variables with empty string "".
  const [token, setToken] = useState("");
  const [greetText, setGreetText] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [addUser, setAddUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    // Both key and value are strings in sessionStorage
    // This code checks if there is an existingUser stored in sessionStorage. If existingUser is found, it retrieves the username from the stored object and sets it in the component's state using setUsername.
    // sessionStorage is a web storage object that stores data for the duration of the page session (i.e., until the browser/tab is closed).
    // If existingUser is found, sessionStorage.getItem("existingUser") returns the stored value, which is a JSON string.
    // JSON.parse() converts this JSON string back into a JavaScript object.
    // After the JSON string is parsed into an object, .username accesses the username property of that object.
    if (sessionStorage.getItem("existingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username);
      setAddUser(true);
      // JSON.stringify() is a method in JavaScript that converts a JavaScript object into a JSON string.
      // JSON.parse() is a method in JavaScript that converts a JSON string into a JavaScript object.
    }
  }, []);

  // useEffect() will run the provided function when the component mounts.
  useEffect(() => {
    console.log("username: ", username);

    // Creates a new Date object representing the current date and time.
    const currentDate = new Date();

    // Formats the day to a full weekday name (e.g., "Monday") using toLocaleDateString with the weekday option.
    const day = currentDate.toLocaleDateString("default", { weekday: "long" });

    // Formats the month to a full month name (e.g., "August") using toLocaleString with the month option.
    const month = currentDate.toLocaleString("default", { month: "long" });

    // Combines the formatted day, month, current date (currentDate.getDate()), and year (currentDate.getFullYear()) into a string and updates the date state.
    setDate(
      `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
    );

    // Retrieves the current hour from currentDate (24-hour format).
    let currentHour = currentDate.getHours();

    // Checks the current hour and updates the greetText state based on the time of day.
    if (currentHour > 0 && currentHour < 12)
      setGreetText("Good Morning, " + username + "!");
    else if (currentHour == 12) setGreetText("Good Noon, " + username + "!");
    else if (currentHour > 12 && currentHour < 18)
      setGreetText("Good Afternoon, " + username + "!");
    else if (currentHour == 18 && currentHour < 21)
      setGreetText("Good Evening, " + username + "!");
    else setGreetText("Good Night, " + username + "!");
  }, [addUser]);

  const handleLogout = () => {
    //Remove existing user details from session storage.
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    dispatch(updateAdminFormState({ loginAdmin: false }));
    // setIsLoginStatus(false);
    // navigate to home
    navigate("/");
  };

  return (
    <>
      <div className="app-cont">
        <Sidebar />
        <div className="app-main">
          <header className="header w-100 flex align-center">
            <div className="container w-100">
              <div className="header-content flex align-center justify-between text-white py-3">
                <div className="greetings">
                  <h3 className="fw-6 outlined-text">{greetText}</h3>
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <div className="date me-3 text-center">
                    <span className="text-uppercase outlined-text fw-6">{date}</span>
                  </div>
                  <div className="logout">
                    {token && (
                      <button
                        onClick={handleLogout}
                        className="btn btn-warning rounded-pill mx-3"
                      >
                        <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                        Log Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="notes-wrapper py-4 px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
