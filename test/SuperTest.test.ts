import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { SuperCoin, SuperCoin__factory } from "../typechain-types";

describe("Super Coin Tests", function (): void {
  async function deployFixture(): Promise<{
    superCoinInstance: SuperCoin;
    signers: HardhatEthersSigner[];
  }> {
    const signers: HardhatEthersSigner[] = await hre.ethers.getSigners();
    const superCoinFactory: SuperCoin__factory =
      await hre.ethers.getContractFactory("SuperCoin");

    const superCoinInstance: SuperCoin = await superCoinFactory.deploy();

    return { superCoinInstance, signers };
  }


  it("should super mint an amount of coins to an address", async ():Promise<void> => {
    const {signers, superCoinInstance} = await loadFixture(deployFixture);
    const targetSigner:HardhatEthersSigner = signers[1];
    const desiredAmount:bigint = hre.ethers.parseEther("50000");
    await superCoinInstance.superMint(targetSigner, desiredAmount);

    const balanceOfSigner:bigint = await superCoinInstance.balanceOf(targetSigner);

    expect(balanceOfSigner).to.equal(desiredAmount);
  });

  it("should NOT super mint an amount of coins to an address (not owner)", async ():Promise<void> => {
    const {signers, superCoinInstance} = await loadFixture(deployFixture);
    const targetSigner:HardhatEthersSigner = signers[1];
    const desiredAmount:bigint = hre.ethers.parseEther("50000");
    const otherInstance:SuperCoin = superCoinInstance.connect(signers[1]);
    await expect(otherInstance.superMint(targetSigner, desiredAmount)).to.be.revertedWithCustomError(superCoinInstance, "OwnableUnauthorizedAccount");

  });
});
