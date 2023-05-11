import React, { useState } from "react";
import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import sha256 from "js-sha256";

const LineItem = ({ index, lineItems, setLineItems }) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][name] = value;
    setLineItems(updatedLineItems);
  };

  const { generalLedger, costCenter, lineItemText, amount } = lineItems[index];

  return (
    <>
      <FormLabel fontSize={"lg"} marginTop={"1em"}>
        Item {index + 1}
      </FormLabel>
      <Input
        type="text"
        name="generalLedger"
        value={generalLedger}
        placeholder="General Ledger"
        size="lg"
        marginBottom={"5px"}
        onChange={onInputChange}
      />
      <Input
        type="text"
        name="costCenter"
        value={costCenter}
        placeholder="Cost Center"
        size="lg"
        onChange={onInputChange}
        marginBottom={"5px"}
      />
      <Input
        type="text"
        name="lineItemText"
        value={lineItemText}
        placeholder="Line Item Text"
        onChange={onInputChange}
        size="lg"
        marginBottom={"5px"}
      />
      <Input
        type="number"
        name="amount"
        value={amount}
        placeholder="Amount Positive for Debit, Negative for Credit"
        onChange={onInputChange}
        size="lg"
      />
    </>
  );
};

const Entry = () => {
  const [lineItems, setLineItems] = useState([
    { generalLedger: "", costCenter: "", lineItemText: "", amount: "" },
    { generalLedger: "", costCenter: "", lineItemText: "", amount: "" },
  ]);

  const [formValue, setFormValue] = useState({
    documentType: "",
    headerText: "",
    documentDate: "",
    postingDate: "",
    lineItems: lineItems,
  });

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { generalLedger: "", costCenter: "", lineItemText: "", amount: "" },
    ]);
    setFormValue({
      ...formValue,
      lineItems: [
        ...lineItems,
        { generalLedger: "", costCenter: "", lineItemText: "", amount: "" },
      ],
    });
  };

  const deleteLineItem = () => {
    if (lineItems.length > 2) {
      // const updatedLineItems = [...lineItems];
      lineItems.pop();
      // updatedLineItems.pop();
      setLineItems(lineItems);
      setFormValue({
        ...formValue,
        lineItems: [...lineItems],
      });
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/entry",
        formValue
      );
      const amounts = formValue.lineItems.map((item) => item.amount);
      const ConcatenatedStringAmount = amounts.join("");
      const hash = sha256(ConcatenatedStringAmount);

      console.log(hash);
      console.log(response.data.entry.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box fontFamily={"auto"} width={"90%"} marginX="auto" marginY="2em">
      <FormLabel marginBottom={"0.5em"} fontWeight="bold" fontSize={"2xl"}>
        Document Header
      </FormLabel>
      <Input
        type="text"
        name="documentType"
        placeholder="Document Type"
        size="lg"
        onChange={onInputChange}
        marginBottom={"15px"}
      />
      <Input
        type="text"
        name="headerText"
        placeholder="Header Text"
        size="lg"
        onChange={onInputChange}
        marginBottom={"15px"}
      />
      <FormLabel fontSize={"md"}>Document Date</FormLabel>
      <Input
        type="date"
        name="documentDate"
        onChange={onInputChange}
        size="lg"
        marginBottom={"15px"}
      />
      <FormLabel fontSize={"md"}>Posting Date</FormLabel>
      <Input
        type="date"
        name="postingDate"
        size="lg"
        onChange={onInputChange}
        marginBottom={"15px"}
      />

      <Flex align={"center"} justify={"space-between"} marginTop={"2em"}>
        <FormLabel fontWeight="bold" fontSize={"2xl"}>
          Line Items
        </FormLabel>
        <Button
          onClick={addLineItem}
          leftIcon={<AddIcon />}
          padding={"22px"}
          colorScheme="white"
          bg="black"
          fontFamily={"sans-serif"}
        >
          Add Line Item
        </Button>
      </Flex>

      {lineItems.map((_, index) => (
        <LineItem
          key={index}
          formValue={formValue}
          setFormValue={setFormValue}
          index={index}
          lineItems={lineItems}
          setLineItems={setLineItems}
        />
      ))}

      {lineItems.length > 2 && (
        <Flex align={"center"} justify={"flex-end"} marginTop={"1em"}>
          <Button
            onClick={deleteLineItem}
            leftIcon={<AddIcon />}
            padding={"16px"}
            colorScheme="white"
            bg="red"
            fontFamily={"sans-serif"}
          >
            Delete Line Item
          </Button>
        </Flex>
      )}

      <Button
        onClick={handleSubmit}
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
