import React, { useState } from "react";

const DeviceUpload = () => {
  const [deviceIds, setDeviceIds] = useState("");
  const [message, setMessage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7070/api/add-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: deviceIds.split(",").map((id) => id.trim()),
        }),
      });
      const data = await response.json();
      setMessage({
        text: data.message,
        type: response.ok ? "success" : "error",
      });
      setDeviceIds("");
    } catch (error) {
      setMessage({ text: "Failed to upload devices", type: "error" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Devices</h1>
      {message && (
        <div
          className={`alert ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Device IDs (comma separated)"
          value={deviceIds}
          onChange={(e) => setDeviceIds(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn btn-primary">
          Add Devices
        </button>
      </form>
    </div>
  );
};

export default DeviceUpload;
