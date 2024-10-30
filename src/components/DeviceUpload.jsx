import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const DeviceUpload = () => {
  const [deviceIds, setDeviceIds] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://fota-backend.onrender.com/api/add-device",
        {
          deviceId: deviceIds.split(",").map((id) => id.trim()),
        }
      );
      console.log(response.data);
      toast.success("Devices Added Successfully");
      setDeviceIds("");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Upload Devices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Devices
      </Typography>

      <Box component="form" onSubmit={handleUpload} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Device IDs"
          placeholder="Enter device IDs (comma separated)"
          value={deviceIds}
          onChange={(e) => setDeviceIds(e.target.value)}
          variant="outlined"
          margin="normal"
          helperText="Please enter device IDs separated by commas"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
              Adding...
            </>
          ) : (
            "Add Devices"
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default DeviceUpload;
