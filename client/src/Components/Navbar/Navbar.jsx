import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavButtons from "./NavButtons";
import { useSelector } from "react-redux";

const Links = [
  // {
  //   linkText: "Admin",
  //   linkUrl: "/admin",
  // },
  {
    linkText: "Entry",
    linkUrl: "/entry",
  },
  {
    linkText: "Show",
    linkUrl: "/show",
  },
  {
    linkText: "Check",
    linkUrl: "/check",
  },
  // {
  //   linkText: "Reverse Check",
  //   linkUrl: "/reverse_check",
  // },
];

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.userAuth.user !== null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="#518d91"
        px={{ base: "0.5em", md: "4.5em" }}
        boxShadow="sm"
        fontFamily="poppins"
        textColor={"white"}
      >
        <Flex
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"lg"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={{ base: 1, md: 8 }} alignItems={"center"}>
            <Box
              fontWeight="bold"
              fontSize={{ base: "lg", md: "3xl" }}
              marginRight={{ base: "0em", md: "1em" }}
            >
              <Link to="/">TEA System</Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
            >
              {isLoggedIn &&
                Links.map((data) => <NavLink key={data.linkUrl} data={data} />)}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <NavButtons isLoggedIn={isLoggedIn} isMobileScreen={false} />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((data) => (
                <NavLink key={data.linkUrl} data={data} />
              ))}

              <NavButtons isLoggedIn={isLoggedIn} isMobileScreen={true} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
