import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";

const Show = () => {
  const [myArray, setMyArray] = useState([]);
  // const [lineItemsArray, setLineItemsArray] = useState([]);
  useEffect(() => {
    const fetchAllMySharedFiles = async () => {
      const response = await axios.get("http://localhost:5000/api/allEntries");
      console.log("resp");
      console.log(response?.data.entries);

      setMyArray(response?.data.entries);
      // setLineItemsArray(response?.data.entries?.lineItems);
    };

    fetchAllMySharedFiles();
  }, []);
  return (
    <Box
      fontFamily={"poppins"}
      width={"95%"}
      marginX="auto"
      paddingY="2em"
      marginTop={"78px"}
    >
      <TableContainer>
        <Table fontSize={"sm"} size="md" variant="simple">
          <Tbody>
            {myArray.map((data, i) => (
              <Box key={i} marginBottom={"60px"}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  marginBottom="15px"
                  marginLeft="15px"
                >
                  Document Number: {data.id}
                </Text>
                <Tr>
                  <Td width={"20%"}>Document Header:</Td>
                  <Td>{data.headerText}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Document Type:</Td>
                  <Td>{data.documentType}</Td>
                </Tr>

                <Tr>
                  <Td width={"20%"}>Entry Date:</Td>
                  <Td>{data.docEntryDate}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Last Modified:</Td>
                  <Td>{data.updatedAt}</Td>
                </Tr>
                <Tr>
                  <Td width={"20%"}>Posting Date:</Td>
                  <Td>{data.postingDate}</Td>
                </Tr>

                {/* <Tr>
                  {lineItemsArray.map((item, index) => (
                    <Box key={index}>
                      <Td width={"20%"}> Line Item {index}:</Td>
                      <Td>
                        GL Code: {item.generalLedger}: Other Expenses | Cost
                        Center: {item.costCenter}: Production{" "}
                        {item.lineItemText} | Text: Electricity bill for March
                        2023 | Amount:{item.amount}
                      </Td>
                    </Box>
                  ))}
                </Tr> */}

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
