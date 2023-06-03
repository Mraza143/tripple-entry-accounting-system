import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
          mx="auto" // centers the modal content horizontally
        >
          <ModalHeader textTransform="uppercase">Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Name</FormLabel>
              <Input type="text" placeholder="Enter car name" />
            </FormControl>
            <FormControl id="number">
              <FormLabel fontWeight="bold">Price</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price in ETH"
              />
            </FormControl>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                placeholder="Enter car description"
                size="md"
                minHeight="10em"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
