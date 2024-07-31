import React, { useState } from "react";
import "./Sidebar.css"; // Ensure you import the CSS
import { useDispatch } from "react-redux";
import { logout } from "../Services/Actions/userAction";

import {
  FaHome,
  FaBriefcase,
  FaTasks,
  FaUser,
  FaCog,
  FaInfoCircle,
  FaHeadset,
  FaSignOutAlt,
  FaSearch,
  FaMoneyBill,
  FaEnvelope,
  FaSlidersH,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-details">
        <i className="bx bxl-codepen"></i>
        <div className="logo_name">StudyHQ</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}>
          {isOpen ? <FaAngleLeft id="btn" className="icon" /> : <FaAngleRight id="btn" className="icon" />}

          {/* see i want to change this react instead i want other icon such as arrow when now open then it should different after open it should rotate by some degree */}
        </i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/" className="linke">
            <i className="bx bx-grid-alt">
              <FaHome className="icon " />
            </i>

            <span className="links_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="/my-gigs" className="linke">
            <i className="bx bx-user">
              <FaBriefcase className="icon " />
            </i>
            <span className="links_name">My studies</span>
          </Link>
          <span className="tooltip">My studies</span>
        </li>
        <li>
          <Link to="/available-gigs" className="linke">
            <i className="bx bx-chat">
              <FaTasks className="icon " />
            </i>
            <span className="links_name">Available studies</span>
          </Link>
          <span className="tooltip">Available studies</span>
        </li>
        <li>
          <Link to="/profile" className="linke">
            <i className="bx bx-pie-chart-alt-2">
              <FaUser className="icon " />
            </i>
            <span className="links_name">Profile</span>
          </Link>
          <span className="tooltip">Profile</span>
        </li>
        <li>
          <Link to="/earnings" className="linke">
            <i className="bx bx-folder">
              <FaMoneyBill className="icon " />
            </i>
            <span className="links_name">Earnings</span>
          </Link>
          <span className="tooltip">Earnings</span>
        </li>
        <li>
          <Link to="/preferences" className="linke">
            <i className="bx bx-cart-alt">
              <FaCog className="icon " />
            </i>
            <span className="links_name">Preferences</span>
          </Link>
          <span className="tooltip">Preferences</span>
        </li>
        <li>
          <Link to="/message" className="linke">
            <i className="bx bx-heart">
              <FaEnvelope className="icon " />
            </i>
            <span className="links_name">Message</span>
          </Link>
          <span className="tooltip">Message</span>
        </li>
        <li>
          <Link to="/knowledge-bank" className="linke">
            <i className="bx bx-cog">
              <FaInfoCircle className="icon " />
            </i>
            <span className="links_name">Knowledge Bank</span>
          </Link>
          <span className="tooltip">Knowledge Bank</span>
        </li>
        <li>
          <Link to="/support" className="linke">
            <i className="bx bx-cog">
              <FaHeadset className="icon " />
            </i>
            <span className="links_name">Support</span>
          </Link>
          <span className="tooltip">Support</span>
        </li>
        <li className="profile">
          <div className="profile-details" onClick={handleLogout}>
            <i className="bx bx-export">
              <FaSignOutAlt className="icon " />
            </i>
            <div className="name_job">
              <div className="name">Logout</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
