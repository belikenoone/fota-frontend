import { create } from "zustand";
import { toaster } from "../components/ui/toaster";
import axios from "axios";
const useFirmwareStore = create((set, get) => ({
  name: "",
  file: null,
  isLoading: false,
  setName: (name) => set({ name }),
  handleFileSelect: async (e) => {
    const selectedFile = e.target.files[0];

    // Validate file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    const maxSize = 50 * 1024 * 1024; // 50MB

    // Check file extension
    if (fileExtension !== "bin") {
      toaster.error({
        title: "Invalid File Type",
        description: "Only .bin files are allowed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      e.target.value = null; // Clear the file input
      return;
    }

    // Size validation
    if (selectedFile.size > maxSize) {
      toaster.error({
        title: "File Too Large",
        description: "File must be under 50MB",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      e.target.value = null; // Clear the file input
      return;
    }

    set({ file: selectedFile });
  },
  handleFirmwareUpload: async () => {
    const { name, file } = get();
    // Validation checks

    if (!name) {
      toaster.error({
        title: "Missing Device Name",
        description: "Please enter a device name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!file) {
      toaster.error({
        title: "No File Selected",
        description: "Please select a firmware .bin file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Start loading state
    set({ isLoading: true });

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("firmware", file);

    try {
      // Axios post request with proper configuration
      const response = await axios.post(
        "http://localhost:7070/api/upload-firmware",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success toast
      toaster.success({
        title: "Upload Successful",
        description: response.data.message || "Firmware uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      set({ name: "" });
      set({ file: null });
    } catch (error) {
      // Error handling
      toaster.error({
        title: "Upload Failed",
        description:
          error.response?.data?.message || "An error occurred during upload",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Upload error:", error);
    } finally {
      // Always stop loading
      set({ isLoading: false });
    }
  },
}));
export default useFirmwareStore;
