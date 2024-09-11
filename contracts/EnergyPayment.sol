// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyPayment {
    address public owner;

    struct User {
        uint balance;
        uint energyPurchased;
    }

    mapping(address => User) public users;

    constructor() {
        owner = msg.sender;
    }

    // Buy energy by sending ether
    function buyEnergy() public payable {
        require(msg.value > 0, "Send ether to buy energy");
        uint energyAmount = msg.value / 1e18;  // 1 ETH = 1 unit of energy
        users[msg.sender].balance += msg.value;
        users[msg.sender].energyPurchased += energyAmount;
    }

    // Transfer energy
    function transferEnergy(address recipient, uint energyAmount) public {
        require(users[msg.sender].energyPurchased >= energyAmount, "Not enough energy");
        users[msg.sender].energyPurchased -= energyAmount;
        users[recipient].energyPurchased += energyAmount;
    }

    // Withdraw funds (only owner)
    function withdrawEther() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Get energy balance for a user
    function getEnergyBalance(address user) public view returns (uint) {
        return users[user].energyPurchased;
    }

    // Get contract's ether balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
