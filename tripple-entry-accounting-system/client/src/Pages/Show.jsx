import React from "react";
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { dummyShowData } from "../dummyData";

const Show = () => {
  return (
    <Box fontFamily={"auto"} width={"95%"} marginX="auto" marginY="2em">
      <TableContainer>
        <Table fontSize={"sm"} size="md" variant="simple">
          <Tbody>
            {dummyShowData.map((data, i) => (
              <Box key={i} marginBottom={"60px"}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  marginBottom="15px"
                  marginLeft="15px"
                >
                  Document Number: {data.docNumber}
                </Text>
                <Tr>
                  <Td width={"20%"}>Document Header:</Td>
                  <Td>{data.docHeader}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Document Type:</Td>
                  <Td>{data.docType}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>User:</Td>
                  <Td>{data.docUser}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Entry Date:</Td>
                  <Td>{data.docEntryDate}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Last Modified:</Td>
                  <Td>{data.docLastModified}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Posting Date:</Td>
                  <Td>{data.docPostingDate}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Line Item 1:</Td>
                  <Td>
                    GL Code: 40000244: Other Expenses | Cost Center: 10010:
                    Production A | Text: Electricity bill for March 2023 |
                    Amount:100000
                  </Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Line Item 2:</Td>
                  <Td>
                    GL Code: 40000244: Other Expenses | Cost Center: 10010:
                    Production A | Text: Electricity bill for March 2023 |
                    Amount:100000
                  </Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Trebit (Blockhain ID):</Td>
                  <Td>{data.docTrebit}</Td>
                </Tr>
              </Box>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Show;
