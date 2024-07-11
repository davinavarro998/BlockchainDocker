// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISuperCoin} from "./interfaces/ISuperCoin.sol";

contract SuperCoin is ERC20, Ownable {
    constructor() ERC20("Super Coin", "SPC") payable Ownable(msg.sender) {
        require(msg.value >= 1 ether, "DEU RUIM KKKKKKKKKKK");
    }

    function superMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
