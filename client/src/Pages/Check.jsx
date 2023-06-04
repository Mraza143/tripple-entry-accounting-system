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
import React, { useState, useEffect } from "react";
// import { dummyCheckData } from "../dummyData";
import { ethers } from "ethers";
import TripleEntryAccounting from "../TripleEntryAccounting.json";
import axios from "axios";
import sha256 from "js-sha256";

const Check = () => {
  const [myArray, setMyArray] = useState([]);
  const [hashes, setHashes] = useState([]);
  /*useEffect(() => {
    const fetchAllMySharedFiles = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        TripleEntryAccounting.address,
        TripleEntryAccounting.abi,
        signer
      );
      const txGet = await contract.getData();
      const normalizedTxGet = txGet.map((entry) => {
        return {
          id: entry.id.toNumber(),
          hash: entry.hashedValue,
        };
      });
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
      });
      
      console.log(Array.isArray(normalizedTxGet));
      console.log("norm "+ normalizedTxGet)
      try {
        const response = await axios.get("http://localhost:5000/api/allEntries");
        const concatenatedAmounts = response?.data.entries.map((entry) => {
          const amounts = entry.lineItems.map((lineItem) => lineItem.amount);
          return sha256(amounts.join(''));
        });
        
        /*const mergedArray = normalizedTxGet.map(({ id: idB, hash: hashB }) => {
          //const { id: idD } = response?.data.entries.find(({ id }) => id === idB) || {};
         // const hashD = concatenatedAmounts[response?.data.entries.findIndex(({ id }) => id === idB)] || '';
      
          return { idB, hashB};
        });
        console.log("merged" + mergedArray);
        
        //console.log("concat " + concatenatedAmounts);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    fetchAllMySharedFiles();
  }, []);*/
  useEffect(() => {
    const fetchAllMySharedFiles = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        TripleEntryAccounting.address,
        TripleEntryAccounting.abi,
        signer
      );
      const txGet = await contract.getData();
      const normalizedTxGet = txGet.map((entry) => {
        return {
          id: entry.id.toNumber(),
          hash: entry.hashedValue,
        };
      });
      console.log("norm");
      console.log(normalizedTxGet);
      const response = await axios.get(
        "https://nice-erin-clam.cyclic.app/api/allEntries"
      );
      console.log("resp");
      console.log(response?.data.entries);

      const concatenatedAmounts = response?.data.entries.map((entry) => {
        const amounts = entry.lineItems.map((lineItem) => lineItem.amount);
        return sha256(amounts.join(""));
      });
      setHashes(concatenatedAmounts);
      console.log("conc");
      console.log(concatenatedAmounts);

      const mergedArray = normalizedTxGet.map(({ id: idB, hash: hashB }) => {
        const { id: idD } =
          response?.data.entries.find(({ id }) => id === idB) || " ";
        const hashD =
          concatenatedAmounts[
            response?.data.entries.findIndex(({ id }) => id === idB)
          ] || "";

        return { idB, hashB, hashD, idD };
      });

      console.log("mergedArray");
      console.log(mergedArray);
      setMyArray(mergedArray);

      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
      });
    };

    fetchAllMySharedFiles();
  }, []);
  return (
    <Box
      fontFamily={"poppins"}
      width={"95%"}
      minH="100vh"
      marginX="auto"
      paddingTop={5}
      paddingBottom={12}
      marginTop={"78px"}
    >
      <Box display={"flex"} alignItems={"center"} gap={5} my={5}>
        <Heading
          fontFamily="Lobster Two"
          textColor={"#4c797c"}
          fontSize={"5xl"}
        >
          Hash Check
        </Heading>
        <Text textColor={"#4c797c"} fontWeight={"bold"} fontSize={"xl"}>
          (Database to Chain)
        </Text>
      </Box>

      <TableContainer marginTop={"20px"}>
        <Table fontSize={"sm"} size="md" variant={"simple"}>
          <Thead>
            <Tr borderRadius={"5px"} bg="#3e8489">
              <Th
                fontSize={"md"}
                px={2}
                py={5}
                fontFamily={"poppins"}
                textColor={"white"}
              >
                ID (Chain)
              </Th>
              <Th
                px={2}
                fontSize={"md"}
                fontFamily={"poppins"}
                textColor={"white"}
              >
                ID (Database)
              </Th>
              <Th fontSize={"md"} fontFamily={"poppins"} textColor={"white"}>
                Hash generated using database data
              </Th>
              <Th fontSize={"md"} fontFamily={"poppins"} textColor={"white"}>
                Hash stored on chain
              </Th>
              <Th fontSize={"md"} fontFamily={"poppins"} textColor={"white"}>
                ID OK?
              </Th>
              <Th fontSize={"md"} fontFamily={"poppins"} textColor={"white"}>
                Hash OK?
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {myArray.map((data, i) => (
              <Tr key={i}>
                <Td>{data.idB}</Td>
                <Td>{data.idD === "" ? "null" : data.idD}</Td>
                <Td>{data.hashD}</Td>
                <Td>{data.hashB}</Td>
                <Td>{data.idB === data.idD ? "true" : "false"}</Td>
                <Td>{data.hashB === data.hashD ? "true" : "false"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Check;
