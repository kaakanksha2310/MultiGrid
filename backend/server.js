const express = require("express");
const { ethers } = require("ethers");  // Correct import with destructuring
require("dotenv").config();  // To load .env variables

const app = express();
const port = 3001;

// Connect to Ethereum network via Sepolia RPC
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Contract details
const contractAddress = "0x037cD4c110F5d5111729EbF058fAf832774DFc5E";  // Your contract address
const contractABI = require("./EnergyExchangeABI.json");  // The ABI file must be in the same directory

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Define a route to fetch the balance for a specific address
app.get("/balance/:address", async (req, res) => {
    const address = req.params.address;

    try {
        const balance = await contract.balances(address);  // Make sure this method exists in your contract
        res.send({ balance: ethers.utils.formatEther(balance) });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).send({ error: "Error fetching balance." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
