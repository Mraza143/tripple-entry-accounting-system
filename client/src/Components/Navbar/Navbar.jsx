import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userAuth.user !== null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        bg="#518d91"
        px={{ base: "0.5em", md: "4.5em" }}
        py={{ base: "unset", md: "0" }}
        boxShadow="sm"
        fontFamily="poppins"
        textColor={"white"}
        width={"full"}
        zIndex={10}
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
            <Box fontWeight="bold" marginRight={{ base: "0em", md: "1em" }}>
              <Box
                cursor="pointer"
                onClick={() => navigate("/")}
                height={"60px"}
                display="flex"
                alignItems="center"
              >
                <img
                  src={"/logo__navbar.png"}
                  alt="Company logo for navigation bar"
                  style={{
                    width: "55px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
                <Text
                  fontSize="3xl"
                  fontStyle="italic"
                  letterSpacing="1px"
                  fontFamily="Lobster Two"
                >
                  TEA System
                </Text>
              </Box>
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
