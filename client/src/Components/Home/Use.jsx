import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { FaExchangeAlt } from "react-icons/fa";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontSize={"md"}>{text}</Text>
    </Stack>
  );
};

export default function Use() {
  return (
    <Container maxW={"5xl"} pt={20} pb={40}>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Stack fontFamily="poppins">
          <Box mb={25}>
            <Heading fontFamily="poppins" mb={5} fontSize={"4xl"}>
              How to use this system?
            </Heading>
            <Text color={"gray.500"} fontSize={"sm"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr
            </Text>
          </Box>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon
                  as={BsFillFileEarmarkPostFill}
                  color={"yellow.500"}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"To post an entity, go to the 'Entry' tab."}
            />
            <Feature
              icon={<Icon as={GrView} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"To view all entries, go to the 'Show' tab."}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={
                "To verify database transactions against the blockchain, go to the 'Check' tab."
              }
            />
            <Feature
              icon={<Icon as={FaExchangeAlt} color={"red.500"} w={5} h={5} />}
              iconBg={useColorModeValue("red.100", "purple.900")}
              text={
                "Modify Fields in the database from the admin site. This will change the hash and hash checks fail."
              }
            />
          </Stack>
        </Stack>
        <Flex justify={"flex-end"}>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"/use__image.png"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
