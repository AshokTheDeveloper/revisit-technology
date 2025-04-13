import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  MdOutlineMessage,
  MdOutlineNotificationsNone,
  MdKeyboardArrowDown,
} from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    return navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo-search-container">
        <h2>Fastcart</h2>
        <div className="search-input-container">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="profile-container">
        <button>
          <MdOutlineMessage className="profile-icons" />
        </button>
        <button>
          <MdOutlineNotificationsNone className="profile-icons" />
        </button>
        <div className="profile">
          <p className="profile-image">A</p>
          <p className="profile-username">johndoe</p>
          <button onClick={() => setShowLogout(!showLogout)}>
            <MdKeyboardArrowDown className="profile-icons" />
          </button>
          {showLogout && (
            <div className="logout-dialog">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
