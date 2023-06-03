import React from "react";
import Hero from "../Components/Home/Hero";
import Use from "../Components/Home/Use";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box marginTop={"78px"}>
      <Hero />
      <Use />
    </Box>
  );
};

export default Home;
