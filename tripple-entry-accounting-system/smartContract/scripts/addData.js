const { ethers } = require("hardhat");

async function addData() {
  const tea = await ethers.getContract("TripleEntryAccounting");
  const data = await tea.addData(0, "Value");
  console.log(console.log("Data Added"));
}

addData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
