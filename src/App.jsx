import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import your components

import FirmwareUpload from "./components/common/FirmwareUpload";
import Navbar from "./components/common/Navbar";
import DeviceManagement from "./components/common/DeviceManagement";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<DeviceManagement />} />
      <Route path="/firmware-upload" element={<FirmwareUpload />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
