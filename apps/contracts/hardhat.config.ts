import { HardhatUserConfig, vars } from "hardhat/config";
// FIXME: import "@nomicfoundation/hardhat-ignition"; // only needed for hardhat-ignition
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@typechain/ethers-v5";

////////////////////////////////////////////////////////////////////////////////
// https://hardhat.org/hardhat-runner/docs/guides/configuration-variables

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and add it to the configuration variables
const INFURA_API_KEY = vars.get("INFURA_API_KEY");

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

////////////////////////////////////////////////////////////////////////////////

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  typechain: {
    target: "ethers-v5",
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};

export default config;
