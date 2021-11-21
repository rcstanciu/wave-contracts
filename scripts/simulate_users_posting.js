// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { setTimeout } = require("timers/promises");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await hre.ethers.getSigners();
  const artifact = await hre.artifacts.readArtifact("WavePortal");
  const wavePortal = await hre.ethers.getContractAt(
    artifact.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  console.log("WavePortal deployed to:", wavePortal.address);
  console.log("WavePortal contract owner:", owner.address);

  for (let i = 0; i <= 100; i++) {
    const waveTxn = await wavePortal.wave(`Wave #${i + 1}`);
    await waveTxn.wait();
    await setTimeout(2000);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
