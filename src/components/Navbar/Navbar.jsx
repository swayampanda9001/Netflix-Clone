import React from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { VscSmiley } from "react-icons/vsc";
import { RiNetflixFill } from "react-icons/ri";
import { CiBellOn } from "react-icons/ci";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Navbar-left">
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New&Popular</li>
          <li>MyList</li>
        </ul>
      </div>
      <div className="navbar-right">
        <CiSearch />
        <VscSmiley />
        <RiNetflixFill />
        <CiBellOn />
        <IoMdArrowDropdownCircle />
        <div className="dropdown">
          <p className="sign-out">Sign out of netflix</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
