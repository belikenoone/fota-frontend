import { useEffect } from "react";
import useDeviceStore from "../store/deviceStore";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const DeviceManagement = () => {
  const {
    loading,
    buttonLoading,
    error,
    success,
    allDevices,
    firmwares,
    selectedDevices,
    selectedFirmware,
    fetchData,
    selectDevice,
    selectFirmware,
    initiateUpdate,
  } = useDeviceStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              onChange={(e) => selectFirmware(e.target.value)}
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
                {allDevices.map((device) => (
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
                            onChange={() => selectDevice(device.deviceId)}
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
            onClick={initiateUpdate}
            disabled={
              !selectedFirmware || selectedDevices.length === 0 || buttonLoading
            }
            sx={{ mt: 4 }}
          >
            {buttonLoading ? "Initiating Update..." : "Initiate Update"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default DeviceManagement;
