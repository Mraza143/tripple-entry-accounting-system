import React, { useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Box } from "@chakra-ui/react";
import AllEntries from "../Components/Dashboard/AllEntries";
import AllUsers from "../Components/Dashboard/AllUsers";
import AllStats from "../Components/Dashboard/AllStats";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("all_stats");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      width={"full"}
      minHeight={"90vh"}
      paddingTop={"80px"}
    >
      <Sidebar activeLink={activeLink} onLinkClick={handleLinkClick} />

      <Box
        width={"full"}
        paddingY={5}
        paddingX={3}
        overflowX={"auto"}
        // maxHeight={"90vh"}
        minHeight={"100%"}
      >
        {activeLink === "all_stats" && <AllStats />}
        {activeLink === "all_entries" && <AllEntries />}
        {activeLink === "all_users" && <AllUsers />}
      </Box>
    </Box>
  );
};

export default Dashboard;
