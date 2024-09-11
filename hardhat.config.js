require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // Sepolia RPC URL from Alchemy or Infura
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
};
