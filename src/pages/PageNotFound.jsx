import { Link } from "react-router-dom";
import pageNotFound from "/src/assets/images/pnf-octocat.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PageNotFound() {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-green-600">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-1"></div>
          <div className="col-span-12 md:col-span-10 flex flex-col justify-center items-center">
            <img
              src={pageNotFound}
              alt="no image"
              className="w-full h-80 object-contain"
            />
            <h1 className="mt-3">Looks like you're lost</h1>
            <h5 className="mt-2 text-base">
              The page you are looking for is unavailable
            </h5>
            <Link to={"/"}>
              <button className="px-6 py-3 text-base bg-green-600 text-white border border-white rounded-full mt-3 hover:bg-green-700">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />Back Home
              </button>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-1"></div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
