import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteUserModal(props) {
  const { isOpen, onOpen, onClose, userName } = props;
  const cancelRef = React.useRef();

  const handleDeleteUser = async (userName) => {
    try {
      await axios
        .delete(`http://localhost:5000/api/user/deleteUser/${userName}`)
        .then(() => {
          toast.success("User Deleted");
        });
    } catch (err) {
      toast.error(err);
    }

    onClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entry
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>

              <Button
                colorScheme="red"
                ml={3}
                onClick={() => handleDeleteUser(userName)}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
