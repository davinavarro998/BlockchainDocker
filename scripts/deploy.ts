import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { SuperCoin, SuperCoin__factory } from "../typechain-types";
import hre, { ethers } from "hardhat";

async function main(): Promise<void> {
  const networkName: string = (await hre.ethers.provider.getNetwork()).name;
  const signers: HardhatEthersSigner[] = await hre.ethers.getSigners();
  const deployer: HardhatEthersSigner = signers[0];
  const superCoinInstance:SuperCoin = await hre.ethers.deployContract("SuperCoin", {from:deployer, value:ethers.parseEther("1")});

  await superCoinInstance.waitForDeployment();

  const superCoinAddress: string = await superCoinInstance.getAddress();

  console.log(
    `Network = ${networkName}\nSuperCoin Address = ${superCoinAddress}\nDeployer = ${deployer.address}`
  );
}

main().catch((err)=>{
    console.log(err);
});
