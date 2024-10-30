import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const FirmwareUpload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage({
      text: `Selected file: ${selectedFile.name}`,
      type: "success",
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear any previous message
    setLoading(true);

    if (!name || !file) {
      setLoading(false);
      return setMessage({
        text: "Please provide both firmware name and file",
        type: "error",
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("firmware", file);

    try {
      await axios.post(
        "https://fota-backend.onrender.com/api/upload-firmware",
        formData
      );
      setMessage({
        text: "Firmware uploaded successfully.",
        type: "success",
      });
      setName("");
      setFile(null);
      toast.success("Firmware uploaded successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Upload Firmware");
      setMessage({
        text: error.response?.data?.error || "Failed to upload firmware",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
        onSubmit={handleUpload}
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
