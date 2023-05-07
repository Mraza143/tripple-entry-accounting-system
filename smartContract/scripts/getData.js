const { ethers } = require("hardhat");

async function getData() {
  const tea = await ethers.getContract("TripleEntryAccounting");
  const data = await tea.getData();
  console.log(console.log(`data: ${data}`));
}

getData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
