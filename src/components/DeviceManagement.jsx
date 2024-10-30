import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
} from "@mui/material";

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [firmwares, setFirmwares] = useState([]);
  const [selectedFirmware, setSelectedFirmware] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devicesRes, firmwaresRes] = await Promise.all([
          axios.get("https://fota-backend.onrender.com/api/devices"),
          axios.get("https://fota-backend.onrender.com/api/firmwares"),
        ]);
        setDevices(devicesRes.data.allDevices);
        setFirmwares(firmwaresRes.data.allFirmwares);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInitiateUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "https://fota-backend.onrender.com/api/initiate-update",
        {
          deviceIds: selectedDevices,
          firmwareName: selectedFirmware,
        }
      );
      setSuccess("Update initiated successfully.");
      setSelectedDevices([]);
      setSelectedFirmware("");
      toast.success("Initiate Update Successful For Selected Devices");
      await fetchData();
    } catch (error) {
      toast.error("Failed To Initiate Update");
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

  const fetchData = async () => {
    try {
      const [devicesRes, firmwaresRes] = await Promise.all([
        axios.get("https://fota-backend.onrender.com/api/devices"),
        axios.get("https://fota-backend.onrender.com/api/firmwares"),
      ]);
      setDevices(devicesRes.data.allDevices);
      setFirmwares(firmwaresRes.data.allFirmwares);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Device Management
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && (
            <Box color="error.main" sx={{ mb: 2 }}>
              {error}
            </Box>
          )}
          {success && (
            <Box color="success.main" sx={{ mb: 2 }}>
              {success}
            </Box>
          )}

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Select Firmware
            </Typography>
            <Select
              value={selectedFirmware}
              onChange={(e) => setSelectedFirmware(e.target.value)}
              fullWidth
              displayEmpty
              inputProps={{ "aria-label": "Select Firmware" }}
            >
              <MenuItem value="">-- Select Firmware --</MenuItem>
              {firmwares.map((firmware) => (
                <MenuItem key={firmware._id} value={firmware.name}>
                  {firmware.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Device ID</TableCell>
                  <TableCell>Pending Update</TableCell>
                  <TableCell>Target Firmware</TableCell>
                  <TableCell>Current Firmware</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.deviceId}>
                    <TableCell>{device.deviceId}</TableCell>
                    <TableCell>{device.pendingUpdate ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {device.pendingUpdate ? device.targetFirmwareName : "-"}
                    </TableCell>
                    <TableCell>{device.currentFirmware || "-"}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDevices.includes(device.deviceId)}
                            onChange={() => handleDeviceSelect(device.deviceId)}
                          />
                        }
                        label=""
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={handleInitiateUpdate}
            disabled={
              loading || !selectedFirmware || selectedDevices.length === 0
            }
            sx={{ mt: 4 }}
          >
            {loading ? "Initiating Update..." : "Initiate Update"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default DeviceManagement;
