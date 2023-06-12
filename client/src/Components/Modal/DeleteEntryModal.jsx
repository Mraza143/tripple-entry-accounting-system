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
import { useNavigate } from "react-router-dom";

export default function DeleteEntryModal(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose, entryId } = props;
  const cancelRef = React.useRef();

  const handleDeleteEntry = async (entryId) => {
    try {
      await axios
        .delete(`https://nice-erin-clam.cyclic.app/api/deleteEntry/${entryId}`)
        .then(() => {
          toast.success("Entry Deleted");
          navigate("/check");
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
                onClick={() => handleDeleteEntry(entryId)}
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
