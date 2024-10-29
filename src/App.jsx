// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import DeviceManagement from "./components/DeviceManagement";
import DeviceUpload from "./components/DeviceUpload";
import FirmwareUpload from "./components/FirmwareUpload";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<DeviceManagement />} />
          <Route path="/upload-device" element={<DeviceUpload />} />
          <Route path="/upload-firmware" element={<FirmwareUpload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
