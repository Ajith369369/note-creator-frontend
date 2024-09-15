import React from "react";
import { BsFillInfoCircleFill, BsPinAngle } from "react-icons/bs";
import { CgArrangeFront } from "react-icons/cg";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { TbCaptureFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./Introduction.scss";

function Introduction() {
  return (
    <>
      <h1 className="text-center mt-3">The simplest way to keep notes</h1>
      <h4 className="text-center">All your notes in one place</h4>

      <div className="row w-100 m-0 my-5">
        <Link
          to={"/profile-home/add"}
          className="flex justify-center align-center"
        >
          <button
            type="button"
            className="btn btn-default p-3 px-5 rounded-pill justify-center align-center"
          >
            <h3>Create A Note</h3>
          </button>
        </Link>
      </div>

      <div className="w-100 m-0 my-5 grid">
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <LuStickyNote />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Project Management</span><br />Tackle any
            project with your notes, all in one place.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <BsPinAngle />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Remember Everything</span><br />Capture
            thoughts and inspiration anywhere, at any time — your important
            notes, and images are safe and right at your fingertips. Make notes
            more useful by adding both text and images.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <FaSearch />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Find Things Fast</span><br />Get what you
            need, when you need it with powerful and flexible search
            capabilities.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <BsFillInfoCircleFill />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Your Information, Your Way</span><br />Use
            Note Creator to capture more than just words. Remind yourself how
            awesome you are with your notes. No matter if it’s meeting notes,
            receipts, manuals, or family recipes, Note Creator keeps them
            secure.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <TbCaptureFilled />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Capture Everything</span><br />Jot down
            your thoughts and inspiration anywhere, at any time. Your important
            notes, and images are safe and right at your fingertips. Capture
            important ideas and information in ways that help you stay
            productive.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <IoDocumentAttachOutline />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Document Everything</span><br />Keep your
            important notes with you, whenever and wherever you need them.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <CgArrangeFront />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">
              Tame Your Work, Organize Your Life
            </span><br />
            Remember everything and tackle any project with your notes, all in
            one place.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <GrWorkshop />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Take Notes, Take Action</span><br />Create
            tasks inside your notes to give your to-dos context, streamline your
            workflow, and get more done—faster.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <FaSyncAlt />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Safe And Synced</span><br />Tired of not
            having the right info handy when you need it? Note Creator saves
            notes online and syncs them to all your devices.
          </h4>
        </div>
        <div className="grid-item d-flex justify-content-start align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <FaSearch />
          </div>
          <h4 className="ms-3">
            <span className="me-2 fw-bold">Search Made Easy</span><br />Use note
            titles, and content to search your notes. It'll help you get the
            right information from your notes quickly and reliably.
          </h4>
        </div>
      </div>

      <div className="row w-100 m-0 my-5">
        <Link
          to={"/profile-home/add"}
          className="flex justify-center align-center"
        >
          <button
            type="button"
            className="btn btn-default p-3 px-5 rounded-pill justify-center align-center"
          >
            <h3>Create A Note</h3>
          </button>
        </Link>
      </div>
    </>
  );
}

export default Introduction;
