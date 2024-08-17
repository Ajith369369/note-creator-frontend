import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import './HomePage.scss'

function HomePage() {
  return (
    <>
      <div className="app flex">
        <Sidebar/>
        <div className="app-main">
          <header className='header w-100 flex align-center'>
            <div className="container w-100">
              <div className="header-content flex align-center justify-between text-white py-3">
              <div className='greetings'>
                {/* <h3 className='fw-6'>{greetText}</h3> */}
                <h3 className='fw-6'>Hello!</h3>
              </div>
              <div className='date'>
                {/* <span className='text-uppercase fs-13 fw-4'>{date}</span> */}
                <span className='text-uppercase fs-13 fw-4'>Date</span>
              </div>
              </div>
            </div>
          </header>
          <div className='notes-wrapper py-4 px-4'>
          <Outlet />
        </div>
        </div>
      </div>
    </>
  )
}

export default HomePage