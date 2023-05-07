import React from "react";
import { Box, Heading, Text, ListItem, UnorderedList } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box fontFamily={"auto"} width={"90%"} marginX={"auto"} marginTop={"2em"}>
      <Heading fontFamily={"auto"} marginBottom={"0.3em"}>
        Tripple Entry Accounting System Using Blockchain
      </Heading>
      <Text fontSize="3xl" fontWeight={"bold"} marginBottom={"1em"}>
        Proof-of-concept demonstration
      </Text>
      <UnorderedList>
        <Text
          fontSize={"xl"}
          fontWeight="bold"
          marginLeft="-15px"
          marginBottom="10px"
        >
          {" "}
          How to use:
        </Text>
        <ListItem>To post an entity, go to the "Entry" tab.</ListItem>
        <ListItem>To view all entries, go to the "Show" tab.</ListItem>
        <ListItem>
          To verify database transactions against the blockchain, go to the
          "Check" tab.
        </ListItem>
        <ListItem>
          To verify the completeness of database transactions against the
          blockchain, go to the "Reverse Check" tab.
        </ListItem>
        <ListItem>
          Modify Fields in the database from the admin site. This will change
          the hash and hash checks fail.
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Home;
