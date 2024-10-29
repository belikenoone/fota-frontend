import React, { useState, useEffect } from "react";
import axios from "axios";

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [firmwares, setFirmwares] = useState([]);
  const [selectedFirmware, setSelectedFirmware] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get("http://localhost:7070/api/devices");
        setDevices(res.data.allDevices);
      } catch (error) {
        setError("Error fetching devices");
      }
    };
    fetchDevices();
  }, []);

  // Fetch firmware list
  useEffect(() => {
    const fetchFirmwares = async () => {
      try {
        const res = await axios.get("http://localhost:7070/api/firmwares");
        setFirmwares(res.data.allFirmwares);
      } catch (error) {
        setError("Error fetching firmware list");
      }
    };
    fetchFirmwares();
  }, []);

  const handleInitiateUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:7070/api/initiate-update", {
        deviceIds: selectedDevices,
        firmwareName: selectedFirmware,
      });
      setSuccess("Update initiated successfully.");
      setSelectedDevices([]);
      setSelectedFirmware("");
      await fetchDevices(); // Refresh devices to show updated status
    } catch (error) {
      setError("Failed to initiate update.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Device Management</h2>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div className="mb-4">
        <label
          htmlFor="firmware"
          className="block text-sm font-medium text-gray-700"
        >
          Select Firmware
        </label>
        <select
          id="firmware"
          value={selectedFirmware}
          onChange={(e) => setSelectedFirmware(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">-- Select Firmware --</option>
          {firmwares.map((firmware) => (
            <option key={firmware._id} value={firmware.name}>
              {firmware.name}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Device ID</th>
            <th className="p-4 text-left">Pending Update</th>
            <th className="p-4 text-left">Target Firmware</th>
            <th className="p-4 text-left">Select</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.deviceId} className="border-b">
              <td className="p-4">{device.deviceId}</td>
              <td className="p-4">{device.pendingUpdate ? "Yes" : "No"}</td>
              <td className="p-4">
                {device.pendingUpdate ? device.targetFirmwareName : "-"}
              </td>
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedDevices.includes(device.deviceId)}
                  onChange={() => handleDeviceSelect(device.deviceId)}
                  disabled={device.pendingUpdate} // Disable checkbox if update is pending
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleInitiateUpdate}
        className={`mt-4 py-3 px-4 rounded-md ${
          loading ? "bg-gray-500" : "bg-indigo-600 text-white"
        }`}
        disabled={loading || !selectedFirmware || selectedDevices.length === 0}
      >
        {loading ? "Initiating Update..." : "Initiate Update"}
      </button>
    </div>
  );
};

export default DeviceManagement;
