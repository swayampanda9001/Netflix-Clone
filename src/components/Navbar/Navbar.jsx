import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { VscSmiley } from "react-icons/vsc";
import { RiNetflixFill } from "react-icons/ri";
import { CiBellOn } from "react-icons/ci";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

const Navbar = ({ searchPageActive = false }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(searchPageActive);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update search active state when searchPageActive prop changes
  useEffect(() => {
    setIsSearchActive(searchPageActive);
  }, [searchPageActive]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={`Navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="Navbar-left">
        <Link to={"/"} className="nav-link">
          <RiNetflixFill className="netflix-logo" />
        </Link>
        <ul>
          <li className="active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-link" to="/tv-shows">TV Shows</Link>
          </li>
          <li>
            <Link className="nav-link" to="/movies">Movies</Link>
          </li>
          <li>
            <Link className="nav-link" to="/new-and-popular">New & Popular</Link>
          </li>
          <li>
            <Link className="nav-link" to="/my-list">My List</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Search
          onSearchToggle={setIsSearchActive}
          isSearchActive={isSearchActive}
        />
        <CiBellOn className="nav-icon" />
        {user ? (
          <div className="user-profile">
            <img
              src={user.photoURL || "/api/placeholder/32/32"}
              alt="Profile"
              className="profile-img"
              onClick={toggleDropdown}
            />
            <IoMdArrowDropdownCircle
              className="dropdown-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown">
                <p>Welcome, {user.displayName || user.email}</p>
                <p className="sign-out" onClick={handleLogout}>
                  Sign out of Netflix
                </p>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
