import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { dummyUserData } from "../../dummyData";
import Pagination from "../Pagination/Pagination";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1); //Pagination Logic
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyUserData.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = dummyUserData.length > itemsPerPage ? true : false;
  return (
    <Box>
      <Heading fontSize={"3xl"} fontFamily={"poppins"} marginBottom={5}>
        All Users
      </Heading>
      <TableContainer fontFamily={"poppins"}>
        <Table variant="simple" fontSize={"sm"}>
          <Thead>
            <Tr textAlign={"left"}>
              <Th fontSize={"md"}>Name</Th>
              <Th fontSize={"md"}>Email</Th>
              <Th fontSize={"md"}>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((data) => (
              <Tr>
                <Td textAlign={"left"}>{data.name}</Td>
                <Td textAlign={"left"}>{data.email}</Td>
                <Td textAlign={"left"}>{data.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={dummyUserData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default AllUsers;
