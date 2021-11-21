const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WavePortal", function () {
  it("Should deploy with balance", async function () {
    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy({
      value: ethers.utils.parseEther("1"),
    });
    await wavePortal.deployed();

    expect(await wavePortal.provider.getBalance(wavePortal.address)).to.equal(
      ethers.utils.parseEther("1")
    );
  });
  it("Should receive prize when waving", async function () {
    const [owner] = await ethers.getSigners();
    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy({
      value: ethers.utils.parseEther("1"),
    });
    await wavePortal.deployed();

    const beforeBalance = await wavePortal.provider.getBalance(
      wavePortal.address
    );
    expect(beforeBalance).to.equal(ethers.utils.parseEther("1"));

    let waveTx = await wavePortal.wave("Message");
    waveTx = await waveTx.wait();
    const afterBalance = await wavePortal.provider.getBalance(
      wavePortal.address
    );

    expect(beforeBalance.sub(afterBalance)).to.equal(
      ethers.utils.parseEther("0.0001")
    );
  });
});
