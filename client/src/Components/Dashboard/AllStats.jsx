import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/features/userDetailsSlice";
import { getAllEntries } from "../../redux/features/entrySlice";
import { useEffect } from "react";

function StatsCard(props) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"10"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }} fontFamily={"poppins"}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function AllStats() {
  const dispatch = useDispatch();
  const { usersDetails } = useSelector((state) => ({
    ...state.userDetails,
  }));
  const { entries } = useSelector((state) => ({
    ...state.entries,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllEntries());
  });

  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"6xl"}
        py={10}
        // fontWeight={"bold"}
        fontFamily="Lobster Two"
        color={"#43a2a7"}
      >
        Our system is expanding, you could be too.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Users"}
          stat={usersDetails?.length}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"Entries"}
          stat={entries?.length}
          icon={<FiServer size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
