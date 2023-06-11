import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

export default function EditEntryModal(props) {
  const { isOpen, onOpen, onClose, entryId, initialFormData } = props;
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLineItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLineItems = [...formData.lineItems];
    updatedLineItems[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      lineItems: updatedLineItems,
    }));
  };

  const handleEditEntry = async (entryId) => {
    const { documentType, headerText, documentDate, lineItems } = formData;

    try {
      await axios
        .put(`http://localhost:5000/api/updateSingleEntry/${entryId}`, {
          documentType,
          headerText,
          documentDate,
          lineItems,
        })
        .then(() => {
          console.log("Entry Updated");
        });
    } catch (error) {
      console.log(error);
    }

    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl" // sets the size of the modal
        isCentered // centers the modal on the screen
      >
        <ModalOverlay />
        <ModalContent
          w="80%" // sets the width of the modal content
          maxW="500px" // sets the maximum width of the modal content
          maxH={"640px"}
          overflowY={"auto"}
          mx="auto" // centers the modal content horizontally
          fontFamily={"poppins"}
        >
          <ModalHeader textTransform="uppercase">Edit Entry # 35</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={0}>
            <FormControl id="text" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Doc. Type
              </FormLabel>
              <Input
                type="text"
                name="documentType"
                placeholder="Enter doc. type"
                value={formData?.documentType}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="text" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Doc. Text
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter doc. text"
                name="headerText"
                value={formData?.headerText}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="date" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Doc. Posting Date
              </FormLabel>
              <Input
                type="date"
                placeholder="Enter doc. posting date"
                name="postingDate"
                value={formData?.postingDate}
                onChange={handleInputChange}
              />
            </FormControl>

            <Text fontSize={"xl"} fontWeight={"bold"} mt={3} mb={1}>
              Line Items:
            </Text>

            {formData?.lineItems?.map((lineItem, index) => (
              <div key={index}>
                <FormControl id={`generalLedger-${index}`} mb={3}>
                  <div>line item {index}</div>
                  <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                    General Ledger
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter general ledger"
                    name="generalLedger"
                    value={lineItem?.generalLedger}
                    onChange={(e) => handleLineItemChange(e, index)}
                  />
                </FormControl>

                <FormControl id={`costCenter-${index}`} mb={3}>
                  <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                    Cost Center
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter cost center"
                    name="costCenter"
                    value={lineItem?.costCenter}
                    onChange={(e) => handleLineItemChange(e, index)}
                  />
                </FormControl>

                <FormControl id={`amount-${index}`} mb={3}>
                  <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                    Amount
                  </FormLabel>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    name="amount"
                    value={lineItem?.amount}
                    onChange={(e) => handleLineItemChange(e, index)}
                  />
                </FormControl>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              width={"100px"}
              colorScheme="blue"
              mr={3}
              onClick={() => handleEditEntry(entryId)}
            >
              Edit
            </Button>
            <Button width={"100px"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
