import React from "react";
import { Link } from "react-router-dom";
import "./Introduction.scss";

function Introduction() {
  return (
    <>
      <h1 className="text-center mt-3">The simplest way to keep notes</h1>
      <h4 className="text-center">All your notes in one place</h4>

      <div className="row w-100 m-0 my-5">
        <Link to={"/profile-home/add"} className="flex justify-center align-center">
          <button type="button" className="btn btn-default p-3 px-5 rounded-pill">
            <h3>Create A Note</h3>
          </button>
        </Link>
      </div>

      <div className="row w-100 m-0 my-5">

      </div>
    </>
  );
}

export default Introduction;
