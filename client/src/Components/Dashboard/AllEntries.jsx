import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { dummyShowData } from "../../dummyData";
import Pagination from "../Pagination/Pagination";
import EditEntryModal from "../Modal/EditEntryModal";
import DeleteEntryModal from "../Modal/DeleteEntryModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllEntries, getSingleEntry } from "../../redux/features/entrySlice";
import axios from "axios";

const AllEntries = () => {
  const dispatch = useDispatch();
  const [singleEntry, setSingleEntry] = useState();

  const { entries } = useSelector((state) => ({
    ...state.entries,
  }));

  useEffect(() => {
    dispatch(getAllEntries());
  }, []);

  const [currentPage, setCurrentPage] = useState(1); //Pagination Logic
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entries.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = entries.length > itemsPerPage ? true : false;

  const [editEntryId, setEditEntryId] = useState(null);
  const [deleteEntryId, setDeleteEntryId] = useState(null);

  const {
    isOpen: isEditEntryModalOpen,
    onOpen: onEditEntryModalOpen,
    onClose: onEditEntryModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteEntryModalOpen,
    onOpen: onDeleteEntryModalOpen,
    onClose: onDeleteEntryModalClose,
  } = useDisclosure();

  const handleEditClick = async (entryId) => {
    setEditEntryId(entryId);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/entry/${entryId}`
      );
      setSingleEntry(response.data.entry);
      // console.log(response.data.entry)
    } catch (err) {
      console.log(err);
    }
    onEditEntryModalOpen();
  };

  const handleDeleteClick = (entryId) => {
    setDeleteEntryId(entryId);
    onDeleteEntryModalOpen();
  };

  return (
    <Box>
      <Heading fontSize={"3xl"} fontFamily={"poppins"} marginBottom={5}>
        All Entries
      </Heading>
      <TableContainer fontFamily={"poppins"}>
        <Table variant="simple" fontSize="xs">
          <Thead>
            <Tr textAlign={"left"}>
              <Th paddingX={"2px"} maxW={"70px"} fontSize={"md"}>
                Doc. ID
              </Th>
              <Th fontSize={"md"}>Doc. Type</Th>
              <Th fontSize={"md"}>Doc. Text</Th>
              <Th paddingX={"0"} fontSize={"md"}>
                Doc. Posting Date
              </Th>
              <Th fontSize={"md"}>Line Items</Th>
              <Th paddingX={2} fontSize={"md"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((data, index) => (
              <Tr key={index}>
                <Td maxW={"70px"}>{data.id}</Td>
                <Td>{data.documentType}</Td>
                <Td>{data.headerText}</Td>
                <Td>{data.postingDate}</Td>

                <Box
                  className="all_entries_scrollbar"
                  maxH={"100px"}
                  overflowY={"auto"}
                >
                  {data.lineItems &&
                    data.lineItems.map((item, i) => (
                      <Td key={i} display={"flex"} flexDirection={"column"}>
                        <Text>General Ledger: {item.generalLedger}</Text>
                        <Text>Cost Center: {item.costCenter}</Text>
                        <Text>Line Items Text: {item.lineItemText}</Text>
                        <Text>Amount: {item.amount}</Text>
                      </Td>
                    ))}
                </Box>
                <Td paddingX={2}>
                  <Button
                    width={"70px"}
                    colorScheme="blue"
                    marginRight={"15px"}
                    fontSize={"sm"}
                    onClick={() => handleEditClick(data?.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    width={"70px"}
                    colorScheme="red"
                    fontSize={"sm"}
                    onClick={() => handleDeleteClick(data?.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Edit Card Modal */}
      {editEntryId && (
        <EditEntryModal
          isOpen={isEditEntryModalOpen}
          onOpen={onEditEntryModalOpen}
          onClose={onEditEntryModalClose}
          entryId={editEntryId}
          initialFormData={singleEntry}
        />
      )}

      {/* Delete Card Modal */}
      {deleteEntryId && (
        <DeleteEntryModal
          isOpen={isDeleteEntryModalOpen}
          onOpen={onDeleteEntryModalOpen}
          onClose={onDeleteEntryModalClose}
          entryId={deleteEntryId}
        />
      )}

      {/* Pagination */}
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={entries.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default AllEntries;
