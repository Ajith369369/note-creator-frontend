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

      <div className="row w-100 m-0 my-5 grid">
        <div className="grid-item">
          <LuStickyNote />
          Tackle any project with your notes, all in one place.
        </div>
        <div className="grid-item">
          <BsPinAngle />
          Remember everything. Capture thoughts and inspiration anywhere, at any
          time—your important notes, and images are safe and right at your
          fingertips. Make notes more useful by adding both text and images.
        </div>
        <div className="grid-item">
          <FaSearch />
          Find things fast. Get what you need, when you need it with powerful
          and flexible search capabilities. Search made easy. Use note titles,
          and content to search your notes. It'll help you get the right
          information from your notes quickly and reliably.
        </div>
        <div className="grid-item">
          <BsFillInfoCircleFill />
          Your information, your way. Use Evernote to capture more than just
          words. Remind yourself how awesome you are with your notes. No matter
          if it’s meeting notes, receipts, manuals, or family recipes, Note
          Creator keeps them secure.
        </div>
        <div className="grid-item">
          <TbCaptureFilled />
          Capture everything. Jot down your thoughts and inspiration anywhere,
          at any time. Your important notes, and images are safe and right at
          your fingertips. Capture important ideas and information in ways that
          help you stay productive.
        </div>
        <div className="grid-item">
          <IoDocumentAttachOutline />
          Document everything. Keep your important notes with you, whenever and
          wherever you need them.
        </div>
        <div className="grid-item">
          <CgArrangeFront />
          Tame your work, organize your life. Remember everything and tackle any
          project with your notes, all in one place.
        </div>
        <div className="grid-item">
          <GrWorkshop />
          Take notes and take action. Create tasks inside your notes to give
          your to-dos context, streamline your workflow, and get more
          done—faster.
        </div>
        <div className="grid-item">
          <FaSyncAlt />
          Safe and synced. Tired of not having the right info handy when you
          need it? Evernote automatically saves notes online and syncs them to
          all your devices.
        </div>
      </div>
    </>
  );
}

export default Introduction;
