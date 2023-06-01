import React, { useState } from "react";
import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ethers } from "ethers";
import TripleEntryAccounting from "../TripleEntryAccounting.json";
import sha256 from "js-sha256";
const LineItem = ({
  index,
  lineItems,
  setLineItems,
  formValue,
  setFormValue,
}) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][name] = value;
    setFormValue({ ...formValue, lineItems: updatedLineItems });
  };

  const { generalLedger, costCenter, lineItemText, amount } = lineItems[index];

  return (
    <>
      <FormLabel fontSize={"md"} marginTop={"1em"}>
        Item {index + 1}
      </FormLabel>
      <Input
        type="text"
        name="generalLedger"
        value={generalLedger}
        placeholder="General Ledger"
        size="md"
        marginBottom={"10px"}
        onChange={onInputChange}
      />
      <Input
        type="text"
        name="costCenter"
        value={costCenter}
        placeholder="Cost Center"
        size="md"
        onChange={onInputChange}
        marginBottom={"10px"}
      />
      <Input
        type="text"
        name="lineItemText"
        value={lineItemText}
        placeholder="Line Item Text"
        onChange={onInputChange}
        size="md"
        marginBottom={"10px"}
      />
      <Input
        type="number"
        name="amount"
        value={amount}
        placeholder="Amount Positive for Debit, Negative for Credit"
        onChange={onInputChange}
        size="md"
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
      lineItems.pop();
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
      const id = response.data.entry.id;
      console.log(`hash:${hash} && id:${id}`);
      console.log(response.data);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        TripleEntryAccounting.address,
        TripleEntryAccounting.abi,
        signer
      );
      const txAdd = await contract.addData(id, hash);
      await txAdd.wait();
      const txGet = await contract.getData();
      const normalizedTxGet = txGet.map((entry) => {
        return {
          id: entry.id.toNumber(),
          hash: entry.hashedValue,
        };
      });
      console.log(normalizedTxGet);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        fontFamily={"poppins"}
        width={"90%"}
        marginX="auto"
        paddingTop="3em"
        paddingBottom={"4em"}
      >
        <FormLabel marginBottom={"0.5em"} fontWeight="bold" fontSize={"2xl"}>
          Document Header
        </FormLabel>
        <Input
          type="text"
          name="documentType"
          placeholder="Document Type"
          size="md"
          onChange={onInputChange}
          marginBottom={"15px"}
        />
        <Input
          type="text"
          name="headerText"
          placeholder="Header Text"
          size="md"
          onChange={onInputChange}
          marginBottom={"15px"}
        />
        <FormLabel fontSize={"md"}>Document Date</FormLabel>
        <Input
          type="date"
          name="documentDate"
          onChange={onInputChange}
          size="md"
          marginBottom={"15px"}
        />
        <FormLabel fontSize={"md"}>Posting Date</FormLabel>
        <Input
          type="date"
          name="postingDate"
          size="md"
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
            bg="#437376"
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
            >
              Delete Line Item
            </Button>
          </Flex>
        )}

        <Button
          width={"20%"}
          onClick={handleSubmit}
          fontSize={"xl"}
          paddingY={"25px"}
          letterSpacing={"1px"}
          marginTop={"1.5em"}
          bg="#437376"
          colorScheme="white"
        >
          Post Entry
        </Button>
      </Box>
    </Box>
  );
};

export default Entry;
