import React from "react";
import { Link } from "react-router-dom";
import "./Introduction.scss";

function Introduction() {
  return (
    <>
      <h1 className="text-center">The simplest way to keep notes</h1>
      <h4 className="text-center">All your notes in one place</h4>

      <div className="row w-100 m-0 my-4">
        <Link to={"/profile-home/add"} className="flex justify-center align-center">
          <button type="button" className="btn btn-default" style={{textDecoration:'none'}}>
            Create A Note
          </button>
        </Link>
      </div>
    </>
  );
}

export default Introduction;
