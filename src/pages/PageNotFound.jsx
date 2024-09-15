import React from "react";
import { Link } from "react-router-dom";
import pageNotFound from "/src/assets/images/PNF_Octocat.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PageNotFound() {
  return (
    <>
      <div
        className="bg-success"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 d-flex flex-column justify-content-center align-items-center">
            <img
              src={pageNotFound}
              alt="no image"
              style={{ width: "100%", height: "350px" }}
            />
            <h1 className="mt-3">Looks like you're lost</h1>
            <h5 className="mt-2" style={{ fontSize: "16px" }}>
              The page you are looking for is unavailable
            </h5>
            <Link to={"/"}>
              <button className="btn btn-success btn-outline-light mx-5 p-3 rounded-pill mt-3" style={{ fontSize: "16px" }}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />Back Home
              </button>
            </Link>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
