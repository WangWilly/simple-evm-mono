import hre from "hardhat";

export const contractsFunction = () => {
  console.log("Contracts are working!");
  console.log("Current network:", hre.ethers);
};

contractsFunction();
