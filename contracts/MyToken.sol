// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// token contract address 
// 0x6991473Ad072dcE2867aC823b24E29aDEcDCC6e7

contract PakoToken is ERC20{

   constructor(address _account,uint initialSupply)  ERC20("Pako Token", "Pak"){
       _mint(_account, initialSupply);
   }
}