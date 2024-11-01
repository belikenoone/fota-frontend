import React, { useEffect } from "react";
import { Box, Button, Spinner, Table } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";

import useDeviceStore from "../../store/deviceStore";
const DeviceManagement = () => {
  const {
    loading,
    fetchData,
    allDevices,
    firmwares,
    selectedDevices,
    selectedFirmware,
    selectDevice,
    selectFirmware,
    buttonLoading,
    initiateUpdate,
  } = useDeviceStore();
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box h={"100dvh"} w={"100%"} display={"grid"} placeItems={"center"}>
        <Spinner color={"green.500"} size={"lg"} />
      </Box>
    );
  }
  return (
    <Box w={"80%"} mx={"auto"} my={10}>
      <Box
        as={"select"}
        w={"full"}
        p={2}
        value={selectedFirmware}
        onChange={(e) => selectFirmware(e.target.value)}
        rounded={"md"}
      >
        <option value="" disabled>
          -
        </option>
        {firmwares.map((firmware) => (
          <option value={firmware.name} key={firmware._id}>
            {firmware.name}
          </option>
        ))}
      </Box>
      <Table.Root size={"lg"} interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Device ID</Table.ColumnHeader>
            <Table.ColumnHeader>Pending Update</Table.ColumnHeader>
            <Table.ColumnHeader>Target Firmware</Table.ColumnHeader>
            <Table.ColumnHeader>Current Firmware</Table.ColumnHeader>
            <Table.ColumnHeader>Select</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allDevices.map((device) => (
            <Table.Row key={device._id}>
              <Table.Cell>{device.deviceId}</Table.Cell>
              <Table.Cell>{device.pendingUpdate ? "Yes" : "No"}</Table.Cell>
              <Table.Cell>
                {device.pendingUpdate ? device.targetFirmwareName : "-"}
              </Table.Cell>
              <Table.Cell>{device.currentFirmware || "-"}</Table.Cell>
              <Table.Cell>
                <Checkbox
                  checked={selectedDevices.includes(device.deviceId)}
                  onChange={() => selectDevice(device.deviceId)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {buttonLoading ? (
        <Button my={4} disabled color={"gray.400"}>
          <Spinner /> Initiating Update
        </Button>
      ) : (
        <Button
          onClick={initiateUpdate}
          disabled={!selectedFirmware || selectedDevices.length === 0}
          my={4}
        >
          Initiate Update
        </Button>
      )}
    </Box>
  );
};
export default DeviceManagement;
