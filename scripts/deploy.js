async function main() {
    // The contract name here must match the contract name in EnergyPayment.sol
    const EnergyPayment = await ethers.getContractFactory("EnergyPayment");  // Correct name
    const energyPayment = await EnergyPayment.deploy();  // Deploy the contract
    console.log("Contract deployed to:", energyPayment.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
