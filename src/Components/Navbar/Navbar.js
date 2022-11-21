import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white p-3 push">
      <div className="d-lg-none">
        <button
          type="button"
          className="btn w-100 btn-alt-secondary d-flex justify-content-between align-items-center"
          data-toggle="className-toggle"
          data-target="#horizontal-navigation-hover-normal"
          data-className="d-none"
        >
          Menu - Hover Normal
          <i className="fa fa-bars" />
        </button>
      </div>
      <div
        id="horizontal-navigation-hover-normal"
        className="d-none d-lg-block mt-2 mt-lg-0"
      >
        <ul className="nav-main nav-main-horizontal nav-main-hover">
          <li className="nav-main-item">
            <Link to="/dashboard" className="nav-main-link active">
              <i className="nav-main-link-icon fa fa-home" />
              <span className="nav-main-link-name">Home</span>
              <span className="nav-main-link-badge badge rounded-pill bg-primary">
                5
              </span>
            </Link>
          </li>
          <li className="nav-main-heading">Manage</li>
          <li className="nav-main-item">
            <Link
              to="/groupmanage"
              className="nav-main-link"
              data-toggle="submenu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="si si-users fa-2x" />
              <span className="nav-main-link-name">Groups</span>
            </Link>
          </li>
          <li className="nav-main-item">
            <a
              className="nav-main-link"
              data-toggle="submenu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="far fa-2x fa-circle-question" />
              <span className="nav-main-link-name">Quiz</span>
            </a>
          </li>
          <li className="nav-main-item">
            <a
              className="nav-main-link"
              data-toggle="submenu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fab fa-2x fa-slideshare" />
              <span className="nav-main-link-name">Slides</span>
            </a>
          </li>
          <li className="nav-main-item">
            <Link
              to="/memesgallery"
              className="nav-main-link"
              data-toggle="submenu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="si si-picture fa-2x" />
              <span className="nav-main-link-name">Memes</span>
            </Link>
          </li>
          <li className="nav-main-heading">Personal</li>
          <li className="nav-main-item ms-auto">
            <a
              className="nav-main-link nav-main-link-submenu"
              data-toggle="submenu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="nav-main-link-icon far fa-user" />
              <span className="nav-main-link-name">Profile</span>
            </a>
            <ul className="nav-main-submenu">
              <li className="nav-main-item">
                <a className="nav-main-link">
                  <span className="nav-main-link-name">Edit</span>
                </a>
              </li>
              <li className="nav-main-item">
                <a className="nav-main-link">
                  <span className="nav-main-link-name">Log out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
