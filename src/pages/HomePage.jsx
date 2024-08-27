import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./HomePage.scss";

function HomePage() {

  // State Initialization: This initializes state variables with empty string "". 
  const [greetText, setGreetText] = useState("");
  const [date, setDate] = useState("");

  // useEffect() will run the provided function when the component mounts.
  useEffect(() => {

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
    if (currentHour > 0 && currentHour < 12) setGreetText("Good Morning!");
    else if (currentHour == 12) setGreetText("Good Noon!");
    else if (currentHour > 12 && currentHour < 18) setGreetText("Good Afternoon!");
    else if (currentHour == 18 && currentHour < 21) setGreetText("Good Evening!");
    else setGreetText("Good Night!");
  }, []);

  return (
    <>
      <div className="app-cont flex">
        <Sidebar />
        <div className="app-main">
          <header className="header w-100 flex align-center">
            <div className="container w-100">
              <div className="header-content flex align-center justify-between text-white py-3">
                <div className="greetings">
                  <h3 className='fw-6'>{greetText}</h3>
                </div>
                <div className="date">
                  <span className='text-uppercase fs-13 fw-4'>{date}</span>
                </div>
              </div>
            </div>
          </header>
          <div className="notes-wrapper py-4 px-4"><Outlet /></div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
