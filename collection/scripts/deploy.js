// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants/constants");

async function main() {
    // Address of the whitelist contract that you deployed in the previous module
    const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
    // URL from where we can extract the metadata for a starry night NFTs
    const metadataURL = METADATA_URL;
    /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so cryptoDevsContract here is a factory for instances of our CryptoDevs contract.
    */
    const Contract = await ethers.getContractFactory("StarryNights");
    console.log("Deployment started🔹🔹🔹, returning a promise that resolves to a contract object 🤞"); 
    // here we deploy the contract
    const deployedContract = await Contract.deploy(
      METADATA_URL, WHITELIST_CONTRACT_ADDRESS
    );
    // 10 is the Maximum number of whitelisted addresses allowed
  
    // Wait for it to finish deploying
    await deployedContract.deployed();
  
    // print the address of the deployed contract  // 0x7903FfeD50A6B249747879DD3e04b70616659768 // 0x9C6A06f8baDF08126F79432d5053Edc59C6fA5c0 
    console.log("🎉Contract Address ==>", deployedContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
