import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noteCreatorLogo from "../assets/images/note-creator-square-logo.jpeg";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <div
        className="container-fluid p-4 flex justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/src/assets/images/header_img.jpg')" }}
      >
        <div className="m-0 p-4 bg-white/10 backdrop-blur-[30px] border-2 border-white/20 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center items-center">
            <div className="ml-3 relative z-[2]">
              <h1 className="text-center text-dark text-7xl relative z-[2]">
                Note Creator
              </h1>
              <h4 className="text-center relative z-[2]">
                One-stop destination for your notes
              </h4>
              <div className="flex justify-center items-center">
                {!token ? (
                  <Link to={"/login"}>
                    <button className="btn btn-outline-light my-4 text-base text-black border-gray-300 hover:border-black">
                      Get Started
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                  </Link>
                ) : (
                  <Link to={"/profile-home/introduction"}>
                    <button className="btn btn-outline-light my-4 text-base text-black border-gray-300 hover:border-black">
                      Manage Notes
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={noteCreatorLogo}
              alt=""
              className="h-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
