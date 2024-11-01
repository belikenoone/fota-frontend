import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";

import useFirmwareStore from "../../store/firmwareStore.jsx";
const FirmwareUpload = () => {
  // State variables
  const {
    name,
    setName,
    file,
    isLoading,
    handleFileSelect,
    handleFirmwareUpload,
  } = useFirmwareStore();

  return (
    <Box
      h="100dvh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        spacing={5}
        width={["300px", "400px", "500px"]}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
      >
        <Text>Upload Firmware</Text>
        <Input
          placeholder="Enter Device Name Here.."
          width="100%"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="file"
          width="100%"
          p={1}
          onChange={handleFileSelect}
          accept=".bin" // Limit file picker to .bin files
        />

        {file && (
          <Text fontSize="sm" color="green.500" py={2}>
            Selected File: {file.name}
          </Text>
        )}
        {isLoading ? (
          <Button disabled color={"gray.400"}>
            <Spinner /> Uploading..
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleFirmwareUpload}
            isDisabled={!name || !file}
          >
            Upload Firmware
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default FirmwareUpload;
