import React from "react";
import { Button, Box, FormLabel, Input, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const LineItem = () => {
  return (
    <>
      <FormLabel fontSize={"lg"} marginTop={"1em"}>
        Item 1
      </FormLabel>
      <Input
        type="text"
        placeholder="General Ledger"
        size="lg"
        marginBottom={"5px"}
      />
      <Input
        type="text"
        placeholder="Cost Center"
        size="lg"
        marginBottom={"5px"}
      />
      <Input
        type="text"
        placeholder="Line Item Text"
        size="lg"
        marginBottom={"5px"}
      />
      <Input
        type="number"
        placeholder="Amount Positive for Debit, Negative for Credit"
        size="lg"
      />
    </>
  );
};

const Entry = () => {
  return (
    <Box fontFamily={"auto"} width={"90%"} marginX="auto" marginY="2em">
      <FormLabel marginBottom={"0.5em"} fontWeight="bold" fontSize={"2xl"}>
        Document Header
      </FormLabel>
      <Input
        type="text"
        placeholder="Document Type"
        size="lg"
        marginBottom={"15px"}
      />
      <Input
        type="text"
        placeholder="Header Text"
        size="lg"
        marginBottom={"15px"}
      />
      <FormLabel fontSize={"md"}>Document Date</FormLabel>
      <Input type="date" size="lg" marginBottom={"15px"} />
      <FormLabel fontSize={"md"}>Posting Date</FormLabel>
      <Input type="date" size="lg" />

      <Flex align={"center"} justify={"space-between"} marginTop={"2em"}>
        <FormLabel fontWeight="bold" fontSize={"2xl"}>
          Line Items
        </FormLabel>

        <Button
          leftIcon={<AddIcon />}
          padding={"22px"}
          colorScheme="white"
          bg="black"
          fontFamily={"sans-serif"}
        >
          Add Line Item
        </Button>
      </Flex>

      {/* Line Items */}
      <LineItem />
      <LineItem />

      <Button
        fontFamily={"sans-serif"}
        letterSpacing={"1px"}
        marginTop={"1.5em"}
        colorScheme="blue"
      >
        Post Entry
      </Button>
    </Box>
  );
};

export default Entry;
