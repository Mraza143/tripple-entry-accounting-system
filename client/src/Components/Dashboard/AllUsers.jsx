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
  Avatar,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { getAllUsers } from "../../redux/features/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { usersDetails } = useSelector((state) => ({
    ...state.userDetails,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
  });

  const [currentPage, setCurrentPage] = useState(1); //Pagination Logic
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usersDetails?.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = usersDetails?.length > itemsPerPage ? true : false;
  return (
    <Box>
      <Heading fontSize={"3xl"} fontFamily={"poppins"} marginBottom={5}>
        All Users
      </Heading>
      <TableContainer fontFamily={"poppins"}>
        <Table variant="simple" fontSize={"sm"}>
          <Thead>
            <Tr textAlign={"left"}>
              <Th width={"10%"} fontSize={"md"}>
                Avatar
              </Th>
              <Th fontSize={"md"}>Name</Th>
              <Th fontSize={"md"}>Email</Th>
              <Th fontSize={"md"}>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((data) => (
              <Tr>
                <Td textAlign={"left"}>
                  <Avatar size={"md"} src={data?.avatar?.url} />
                </Td>
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
          totalItems={usersDetails?.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default AllUsers;
