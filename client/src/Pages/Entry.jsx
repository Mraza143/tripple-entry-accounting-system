import React from "react";
import { Button, Box, FormLabel, Input, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { register } from "../redux/features/userSlice";

const initialState = {
  documentType: "",
  headerText: "",
  documentDate: "",
  postingDate: "",
  lineItems: [
    {
      generalLedger: "",
      costCenter: "",
      lineItemText: "",
      amount: "",
    },
    {
      generalLedger: "",
      costCenter: "",
      lineItemText: "",
      amount: "",
    },
  ],
};

const LineItem = (props) => {
  console.log(props.index);
  const gname = "generalLedger_" + props.index;
  const cname = "costCenter_" + props.index;
  const lname = "lineItemText_" + props.index;
  const aname = "amount_" + props.index;
  console.log(lname);
  const [formValue, setFormValue] = useState(initialState);
  // const { lineItems } = formValue;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is a line item
    const [fieldName, fieldIndex] = name.split("_");
    console.log(fieldName);
    if (
      fieldName === "generalLedger" ||
      fieldName === "costCenter" ||
      fieldName === "lineItemText" ||
      fieldName === "amount"
    ) {
      // Update the specific line item at the given index
      const lineItemsCopy = [...formValue.lineItems];
      lineItemsCopy[fieldIndex][fieldName] = value;
      setFormValue({ ...formValue, lineItems: lineItemsCopy });
    } else {
      // Update the regular form field
      // setFormValue({ ...formValue, [name]: value });
      console.log("ERROR");
    }
  };

  return (
    <>
      <FormLabel fontSize={"lg"} marginTop={"1em"}>
        Item 1
      </FormLabel>
      <Input
        type="text"
        name={gname}
        placeholder="General Ledger"
        size="lg"
        marginBottom={"5px"}
        onChange={onInputChange}
      />
      <Input
        type="text"
        name={cname}
        placeholder="Cost Center"
        size="lg"
        onChange={onInputChange}
        marginBottom={"5px"}
      />
      <Input
        type="text"
        name={lname}
        placeholder="Line Item Text"
        onChange={onInputChange}
        size="lg"
        marginBottom={"5px"}
      />
      <Input
        type="number"
        name={aname}
        placeholder="Amount Positive for Debit, Negative for Credit"
        onChange={onInputChange}
        size="lg"
      />
    </>
  );
};

const Entry = () => {
  // const [showPassword, setShowPassword] = useState(false);

  const [formValue, setFormValue] = useState(initialState);

  // const { loading, error } = useSelector((state) => ({ ...state.userAuth }));

  const { documentType, headerText, documentDate, postingDate, lineItems } =
    formValue;

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   error && toast.error(error);
  // }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (name && email && password && role) {
    //   dispatch(register({ formValue, navigate, toast }));
    console.log(`Document Type : ${documentType}`);
    console.log(`headerText : ${headerText}`);
    console.log(`documentDate : ${documentDate}`);
    console.log(`postingDate : ${postingDate}`);
    // console.log(`lineItems : ${lineItems[0].generalLedger}`);
    // console.log(`lineItems : ${lineItems[0].costCenter}`);
    // console.log(`lineItems : ${lineItems[0].lineItemText}`);
    // console.log(`lineItems : ${lineItems[0].amount}`);
    // console.log(`lineItems : ${lineItems[1].generalLedger}`);
    // console.log(`lineItems : ${lineItems[1].costCenter}`);
    // console.log(`lineItems : ${lineItems[1].lineItemText}`);
    // console.log(`lineItems : ${lineItems[1].amount}`);
    if (documentType && headerText && documentDate && postingDate && lineItems)
      try {
        const response = await axios.post(
          "http://localhost:5000/api/entry",
          formValue
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    else console.log("error");
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    console.log(name, " ", value);
    setFormValue({ ...formValue, [name]: value });
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
        onChange={onInputChange}
        name="documentDate"
        size="lg"
        marginBottom={"15px"}
      />
      <FormLabel fontSize={"md"}>Posting Date</FormLabel>
      <Input
        type="date"
        onChange={onInputChange}
        name="postingDate"
        size="lg"
      />

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
      <LineItem index={0} />
      <LineItem index={1} />

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
