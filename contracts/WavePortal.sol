// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    event Wave(address indexed from, uint256 timestamp, string message);

    constructor() {
        console.log("Yo yo, I am a contract and I am smart.");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        emit Wave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have a total of %d waves so far.", totalWaves);
        return totalWaves;
    }
}
