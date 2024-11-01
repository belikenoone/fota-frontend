import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box as="header" position="sticky" w="100%" bg="green.400">
        <Flex
          width="80%"
          mx="auto"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Text fontSize="xl" fontWeight="bold">
            IoT FOTA
          </Text>
          <Flex gap={5} justifyContent="center" alignItems="center">
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "white",
                      color: "black",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }
                  : { color: "white" }
              }
            >
              All Devices
            </NavLink>
            <NavLink
              to="/firmware-upload"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "white",
                      color: "black",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }
                  : { color: "white" }
              }
            >
              Firmware Upload
            </NavLink>
            <NavLink
              to="/upload-devices"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "white",
                      color: "black",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }
                  : { color: "white" }
              }
            >
              Upload Devices
            </NavLink>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};

export default Navbar;
