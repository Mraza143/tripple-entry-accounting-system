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
import { dummyCheckData } from "../dummyData";

const Check = () => {
  return (
    <Box fontFamily={"auto"} width={"95%"} marginX="auto" marginY="2em">
      <Heading fontFamily={"auto"} fontSize={"4xl"}>
        Hash Check
      </Heading>
      <Text marginTop={"5px"} fontSize={"xl"}>
        Database to Chain
      </Text>

      <TableContainer marginTop={"20px"}>
        <Table fontSize={"xs"} size="md" variant={"simple"}>
          <Thead>
            <Tr bg="#f5f5f5">
              <Th>
                Doc. number in <br /> database
              </Th>
              <Th>
                Doc. number on <br /> chain
              </Th>
              <Th>Hash generated using database data</Th>
              <Th>Hash stored on chain</Th>
              <Th>ID OK?</Th>
              <Th>Hash OK?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyCheckData.map((data, i) => (
              <Tr key={i}>
                <Td>{data.docNumberDatabase}</Td>
                <Td>{data.docNumberChain}</Td>
                <Td>{data.hashDatabase}</Td>
                <Td>{data.hashChain}</Td>
                <Td>
                  {data.docNumberDatabase === data.docNumberChain
                    ? "true"
                    : "false"}
                </Td>
                <Td>
                  {data.hashDatabase === data.hashChain ? "true" : "false"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Check;
