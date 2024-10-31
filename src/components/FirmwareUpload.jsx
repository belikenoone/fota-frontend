// FirmwareUpload.js
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import useFirmwareStore from "../store/firmwareStore";

const FirmwareUpload = () => {
  const {
    name,
    file,
    message,
    loading,
    setName,
    setFile,
    setMessage,
    handleUpload,
  } = useFirmwareStore();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload Firmware
      </Typography>

      {message && (
        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={() => setMessage(null)}
        >
          <Alert
            severity={message.type}
            sx={{ width: "100%" }}
            onClose={() => setMessage(null)}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Firmware Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button variant="contained" component="label">
          {file ? "Choose Another File" : "Choose Firmware File"}
          <input type="file" hidden onChange={handleFileSelect} required />
        </Button>
        {file && (
          <Box>
            <Typography variant="body1">Selected file: {file.name}</Typography>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !file}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Upload Firmware
        </Button>
      </Box>
    </Box>
  );
};

export default FirmwareUpload;
