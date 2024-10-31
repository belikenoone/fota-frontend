import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import useDeviceStore from "../store/deviceStore";

const DeviceUpload = () => {
  const { deviceIds, setDeviceIds, uploadDevices, loading } = useDeviceStore();

  const handleUpload = async (e) => {
    e.preventDefault();
    await uploadDevices();
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
          value={deviceIds} // value tied to store
          onChange={(e) => setDeviceIds(e.target.value)} // updates store
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
