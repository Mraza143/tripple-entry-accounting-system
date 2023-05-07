import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { dummyReverseCheckData } from "../dummyData";

const ReverseCheck = () => {
  return (
    <Box fontFamily={"auto"} width={"95%"} marginX="auto" marginY="2em">
      <Heading fontFamily={"auto"} fontSize={"4xl"}>
        Reverse Hash Check
      </Heading>
      <Text marginTop={"5px"} fontSize={"xl"}>
        Chain to Database
      </Text>

      <TableContainer marginTop={"20px"}>
        <Table fontSize={"xs"} size="md" variant={"simple"}>
          <Thead>
            <Tr bg="#f5f5f5">
              <Th>Transaction ID on chain</Th>
              <Th>Transaction ID in database</Th>
              <Th>
                Document <br /> number
              </Th>
              <Th>Hash stored on chain</Th>
              <Th>Hash generated using database data</Th>
              <Th>Transaction ID OK?</Th>
              <Th>Hash OK?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyReverseCheckData.map((data, i) => (
              <Tr key={i}>
                <Td>{data.TIDChain}</Td>
                <Td>{data.TIDDatabase}</Td>
                <Td>{data.docNumber}</Td>
                <Td>{data.hashChain}</Td>
                <Td>{data.hashDatabase}</Td>
                <Td>{data.TIDChain === data.TIDDatabase ? "true" : "false"}</Td>
                <Td>
                  {data.hashChain === data.hashDatabase ? "true" : "false"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReverseCheck;
