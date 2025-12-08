import React from "react";
import { BsFillInfoCircleFill, BsPinAngle } from "react-icons/bs";
import { CgArrangeFront } from "react-icons/cg";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { TbCaptureFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <>
      <h1 className="text-center mt-3">The simplest way to keep notes</h1>
      <h4 className="text-center">All your notes in one place</h4>

      <div className="w-full m-0 my-12">
        <Link
          to={"/profile-home/add"}
          className="flex justify-center items-center no-underline"
        >
          <button
            type="button"
            className="flex justify-center items-center bg-red-salsa text-white border border-black py-3 px-12 rounded-full"
          >
            <h3>Create A Note</h3>
          </button>
        </Link>
      </div>

      <div className="w-full m-0 my-12 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <LuStickyNote className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Project Management</span>
            <br />
            Tackle any project with your notes, all in one place.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <BsPinAngle className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Remember Everything</span>
            <br />
            Capture thoughts and inspiration anywhere, at any time — your
            important notes, and images are safe and right at your fingertips.
            Make notes more useful by adding both text and images.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <FaSearch className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Find Things Fast</span>
            <br />
            Get what you need, when you need it with powerful and flexible
            search capabilities.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <BsFillInfoCircleFill className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Your Information, Your Way</span>
            <br />
            Use Note Creator to capture more than just words. Remind yourself
            how awesome you are with your notes. No matter if it's meeting
            notes, receipts, manuals, or family recipes, Note Creator keeps them
            secure.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <TbCaptureFilled className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Capture Everything</span>
            <br />
            Jot down your thoughts and inspiration anywhere, at any time. Your
            important notes, and images are safe and right at your fingertips.
            Capture important ideas and information in ways that help you stay
            productive.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <IoDocumentAttachOutline className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Document Everything</span>
            <br />
            Keep your important notes with you, whenever and wherever you need
            them.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <CgArrangeFront className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">
              Tame Your Work, Organize Your Life
            </span>
            <br />
            Remember everything and tackle any project with your notes, all in
            one place.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <GrWorkshop className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Take Notes, Take Action</span>
            <br />
            Create tasks inside your notes to give your to-dos context,
            streamline your workflow, and get more done—faster.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <FaSyncAlt className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Safe And Synced</span>
            <br />
            Tired of not having the right info handy when you need it? Note
            Creator saves notes online and syncs them to all your devices.
          </h4>
        </div>
        <div className="flex justify-start items-center p-2.5 bg-gray-100 min-h-[120px] max-w-full">
          <div className="h-full flex justify-center items-center min-w-[60px] min-h-[60px]">
            <FaSearch className="w-[60px] h-[60px]" />
          </div>
          <h4 className="ml-3 normal-case text-justify max-w-[calc(100%-20px)]">
            <span className="mr-2 font-bold text-lg text-left">Search Made Easy</span>
            <br />
            Use note titles to search your notes. It'll help you get the right
            information from your notes quickly and reliably.
          </h4>
        </div>
      </div>

      <div className="w-full m-0 my-12">
        <Link
          to={"/profile-home/add"}
          className="flex justify-center items-center no-underline"
        >
          <button
            type="button"
            className="flex justify-center items-center bg-red-salsa text-white border border-black py-3 px-12 rounded-full"
          >
            <h3>Create A Note</h3>
          </button>
        </Link>
      </div>
    </>
  );
}

export default Introduction;
