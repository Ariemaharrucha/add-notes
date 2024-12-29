import { Box, Flex, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineFile  } from "react-icons/ai";
import { FaArchive, } from "react-icons/fa";

const navItems = [
  { label: "All Notes", path: "/", icon: AiOutlineFile },
  { label: "Archived", path: "/archived", icon: FaArchive },
  { label: "Unrchived", path: "/unarchived", icon: FaArchive },
];

export const Header = () => {
  return (
    <Box borderBottomWidth="3px" borderColor="blue.500">
      <Text fontSize={'large'} my={3} color={'blue.700'}>Your Notes</Text>
      <Flex justify="star" gap={2} py={2}>
        {navItems.map((item, index) => {
          const Icon = item.icon; 
          return (
            <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              cursor: "pointer",
              padding: "8px",
              backgroundColor: isActive ? "rgba(0, 0, 255, 0.8)" : "rgba(0, 0, 255, 0.6)", 
              color:  "white", 
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 'semibold'
            })}
          >
            <Icon style={{ fontSize: "20px" }} />
            <Text>{item.label}</Text>
          </NavLink>
          );
        })}
      </Flex>
    </Box>
  );
};
