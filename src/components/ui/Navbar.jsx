// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-semibold text-lg">IoT Device Manager</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Device Management
          </Link>
          <Link to="/upload-device" className="text-white">
            Add Devices
          </Link>
          <Link to="/upload-firmware" className="text-white">
            Upload Firmware
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
