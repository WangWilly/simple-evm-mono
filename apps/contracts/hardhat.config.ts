import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@typechain/ethers-v5";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  typechain: {
    target: "ethers-v5",
  },
};

export default config;
