// stores/useFirmwareStore.js
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const useFirmwareStore = create((set) => ({
  name: "",
  file: null,
  message: null,
  loading: false,
  setName: (name) => set({ name }),
  setFile: (file) =>
    set({
      file,
      message: file
        ? { text: `Selected file: ${file.name}`, type: "success" }
        : null,
    }),
  setMessage: (message) => set({ message }),
  setLoading: (loading) => set({ loading }),

  handleUpload: async () => {
    set({ loading: true, message: null });

    const { name, file } = useFirmwareStore.getState();

    if (!name || !file) {
      set({
        loading: false,
        message: {
          text: "Please provide both firmware name and file",
          type: "error",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("firmware", file);

    try {
      await axios.post(
        "https://fota-backend.onrender.com/api/upload-firmware",
        formData
      );
      set({
        name: "",
        file: null,
        message: { text: "Firmware uploaded successfully.", type: "success" },
      });
      toast.success("Firmware uploaded successfully.");
    } catch (error) {
      toast.error("Failed To Upload Firmware");
      set({
        message: {
          text: error.response?.data?.error || "Failed to upload firmware",
          type: "error",
        },
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useFirmwareStore;
