import React from "react";
import "./HomeNavbar.css";
import { Link } from "react-router-dom";
import { House } from "react-bootstrap-icons";

const HomeNavbar = () => {
  return (
    <nav class="navbar navbar-expand-md navbar-dark introNavbar">
      <div class="container-fluid">
        <div class="me-auto">
          <Link to="/" className="menu-icon-link">
            <House className="mx-0 list-icon-home" size={45} />
          </Link>
        </div>
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>

        <div class="mx-auto order-0 d-flex align-items-center">
          <h1 className="ms-0 hw text-white fw-bold my-4" style={{ whiteSpace: 'nowrap' }}>Carhalla Parking</h1>
        </div>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <div className=" ms-auto px-5 mx-3">
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;