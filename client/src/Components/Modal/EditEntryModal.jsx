import React from "react";
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

export default function EditEntryModal(props) {
  const { isOpen, onOpen, onClose, entryId } = props;

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
              <Input type="text" placeholder="Enter doc. type" />
            </FormControl>
            <FormControl id="text" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Doc. Text
              </FormLabel>
              <Input type="text" placeholder="Enter doc. text" />
            </FormControl>
            <FormControl id="date" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Doc. Posting Date
              </FormLabel>
              <Input type="date" placeholder="Enter doc. posting date" />
            </FormControl>

            <FormControl id="text" mb={3}>
              <Text fontSize={"xl"} fontWeight={"bold"} mt={3} mb={1}>
                Line Items:
              </Text>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                General Ledger
              </FormLabel>
              <Input type="text" placeholder="Enter general ledger" />
            </FormControl>

            <FormControl id="text" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Cost Center
              </FormLabel>
              <Input type="text" placeholder="Enter cost center" />
            </FormControl>

            <FormControl id="number" mb={3}>
              <FormLabel fontWeight="bold" fontSize={"sm"} mb={1}>
                Amount
              </FormLabel>
              <Input type="number" min="0" placeholder="Enter amount" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button width={"100px"} colorScheme="blue" mr={3}>
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
