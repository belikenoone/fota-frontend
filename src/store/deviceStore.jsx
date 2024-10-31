import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
const useDeviceStore = create((set, get) => ({
  loading: false, // For initial page load
  buttonLoading: false, // For button-specific loading during initiate update
  error: null,
  allDevices: [],
  firmwares: [],
  selectedDevices: [],
  selectedFirmware: "",
  success: null,
  deviceIds: "",

  fetchData: async () => {
    set({ loading: true, error: null });

    try {
      const [devicesResponse, firmwaresResponse] = await Promise.all([
        axios.get("https://fota-backend.onrender.com/api/devices"),
        axios.get("https://fota-backend.onrender.com/api/firmwares"),
      ]);

      set({
        allDevices: devicesResponse.data.allDevices,
        firmwares: firmwaresResponse.data.allFirmwares,
      });
    } catch (error) {
      set({ error: "Error fetching data" });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  selectDevice: (deviceId) => {
    set((state) => ({
      selectedDevices: state.selectedDevices.includes(deviceId)
        ? state.selectedDevices.filter((id) => id !== deviceId)
        : [...state.selectedDevices, deviceId],
    }));
  },

  selectFirmware: (firmwareName) => {
    set({ selectedFirmware: firmwareName });
  },

  initiateUpdate: async () => {
    set({ buttonLoading: true, error: null, success: null });

    const { selectedDevices, selectedFirmware, fetchData } = get();

    try {
      await axios.post(
        "https://fota-backend.onrender.com/api/initiate-update",
        {
          deviceIds: selectedDevices,
          firmwareName: selectedFirmware,
        }
      );

      set({
        selectedDevices: [],
        selectedFirmware: "",
        success: "Update initiated successfully",
      });
      toast.success("Initiate Update Successful For Selected Devices");
      await fetchData();
    } catch (error) {
      set({ error: "Failed to initiate update" });
      toast.error("Failed To Initiate Update");
    } finally {
      set({ buttonLoading: false });
    }
  },
  setDeviceIds: (ids) => set({ deviceIds: ids }),
  uploadDevices: async () => {
    const deviceIds = get().deviceIds;
    set({ loading: true });

    try {
      await axios.post("https://fota-backend.onrender.com/api/add-device", {
        deviceId: deviceIds.split(",").map((id) => id.trim()),
      });
      toast.success("Devices Added Successfully");
      set({ deviceIds: "" });
    } catch (error) {
      console.error("Error uploading devices:", error);
      toast.error("Failed To Upload Devices");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDeviceStore;
