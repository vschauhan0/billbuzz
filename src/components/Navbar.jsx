import React, { useState, useEffect } from "react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useAuth } from "./contexts/AuthContext";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

library.add(fas, far, fab);

function Navbar() {
  const { userEmail, handleLogout } = useAuth();

  return (
    <div className="">
      <nav>
        <ul className="flex justify-between p-2 ">
          <li className="font-bold text-2xl">
            <span className="me-2 cursor-pointer">
              <Link to="sidebar">
                <FontAwesomeIcon icon="fa-solid fa-bars" />
              </Link>
            </span>
            <span className="text-xl">
              <Link to="/"><span className="text-red-600 text-2xl">B</span>ill<span  className="text-red-600 text-2xl">B</span>uzz</Link>
            </span>
          </li>
          {userEmail ? (
            <button>Logout</button>
          ) : (
            <li>
              <Link to="signup">
                <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 ">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Sign Up
                  </span>
                </button>
              </Link>

              <Link to="login">
                <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 ">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Log In
                  </span>
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
