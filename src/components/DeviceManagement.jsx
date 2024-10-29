import { useEffect, useState } from "react";

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  const [firmwares, setFirmwares] = useState([]);
  const [selectedFirmware, setSelectedFirmware] = useState("");
  const [message, setMessage] = useState(null);

  // Fetch devices and firmware data
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:7070/api/devices");
        const data = await response.json();
        console.log(data);
        setDevices(data.allDevices || []);
      } catch (error) {
        setMessage({ text: "Failed to fetch devices", type: "error" });
      }
    };

    const fetchFirmwares = async () => {
      try {
        const response = await fetch("http://localhost:7070/api/firmwares"); // Assume you have an endpoint to get firmware
        const data = await response.json();
        setFirmwares(data.allFirmwares || []);
      } catch (error) {
        setMessage({ text: "Failed to fetch firmware list", type: "error" });
      }
    };

    fetchDevices();
    fetchFirmwares();
  }, []);

  // Handle device selection
  const handleSelectDevice = (deviceId) => {
    setSelectedDevices((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(deviceId)) newSelected.delete(deviceId);
      else newSelected.add(deviceId);
      return newSelected;
    });
  };

  // Handle firmware selection
  const handleFirmwareSelect = (e) => {
    setSelectedFirmware(e.target.value);
  };

  // Initiate firmware update
  const initiateUpdate = async () => {
    if (!selectedFirmware || selectedDevices.size === 0) {
      return setMessage({
        text: "Please select firmware and at least one device",
        type: "error",
      });
    }

    try {
      const response = await fetch("/api/initiate-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceIds: Array.from(selectedDevices),
          firmwareName: selectedFirmware,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setSelectedDevices(new Set());
        setSelectedFirmware("");
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Failed to initiate update", type: "error" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Device Management
      </h1>
      {message && (
        <div
          className={`alert ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          } mb-4`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="font-semibold">Select Firmware:</label>
        <select
          value={selectedFirmware}
          onChange={handleFirmwareSelect}
          className="form-select ml-2"
        >
          <option value="" disabled>
            Select firmware
          </option>
          {firmwares.map((firmware) => (
            <option key={firmware._id} value={firmware.name}>
              {firmware.name}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">Select</th>
            <th className="px-6 py-3 text-left">Device ID</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.deviceId} className="border-b">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedDevices.has(device.deviceId)}
                  onChange={() => handleSelectDevice(device.deviceId)}
                />
              </td>
              <td className="px-6 py-4">{device.deviceId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={initiateUpdate}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Initiate Update
      </button>
    </div>
  );
};

export default DeviceManagement;
