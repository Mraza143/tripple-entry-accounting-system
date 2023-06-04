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
      const response = await axios.get("https://nice-erin-clam.cyclic.app/api/allEntries");
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
      minH="100vh"
      width={"90%"}
      marginX="auto"
      paddingY="2em"
      marginTop={"78px"}
    >
      <TableContainer>
        <Table fontSize={"md"} size="md" variant="simple">
          <Tbody>
            {myArray.map((item) => (
              <Box key={item.number} marginBottom={"60px"}>
                <Text
                  fontFamily="Lobster Two"
                  textColor={"#4c797c"}
                  fontSize="4xl"
                  fontWeight={"bold"}
                  marginBottom="15px"
                >
                  Document Number: {item.id}
                </Text>
                <Tr>
                  <Td
                    bg={"#518d91"}
                    textColor="white"
                    border={"1px"}
                    borderColor="white"
                    width={"20%"}
                  >
                    Document Header:
                  </Td>
                  <Td>{item.headerText}</Td>
                </Tr>
                <Tr>
                  <Td
                    bg={"#518d91"}
                    textColor="white"
                    border={"1px"}
                    borderColor="white"
                    width={"20%"}
                  >
                    Document Type:
                  </Td>
                  <Td>{item.documentType}</Td>
                </Tr>

                <Tr>
                  <Td
                    bg={"#518d91"}
                    textColor="white"
                    border={"1px"}
                    borderColor="white"
                    width={"20%"}
                  >
                    Entry Date:
                  </Td>
                  <Td>{item.documentDate}</Td>
                </Tr>
                <Tr>
                  <Td
                    bg={"#518d91"}
                    textColor="white"
                    border={"1px"}
                    borderColor="white"
                    width={"20%"}
                  >
                    Last Modified:
                  </Td>
                  <Td>{item.updatedAt}</Td>
                </Tr>
                <Tr>
                  <Td
                    bg={"#518d91"}
                    textColor="white"
                    border={"1px"}
                    borderColor="white"
                    width={"20%"}
                  >
                    Posting Date:
                  </Td>
                  <Td>{item.postingDate}</Td>
                </Tr>
                <ul>
                  {item.lineItems.map((obj, index) => (
                    <Box key={index}>
                      <Td
                        bg={"#518d91"}
                        textColor="white"
                        border={"1px"}
                        borderColor="white"
                        width={"200px"}
                      >
                        {" "}
                        Line Item {index}:
                      </Td>
                      <Td>
                        GL Code: {obj.generalLedger}: Other Expenses | Cost
                        Center: {obj.costCenter}: Production {obj.lineItemText}{" "}
                        | Text: Electricity bill for March 2023 | Amount:
                        {obj.amount}
                      </Td>
                    </Box>
                  ))}
                </ul>
              </Box>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Show;
