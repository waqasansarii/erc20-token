// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TokenSale is Ownable {
    address public admin;
    uint256 public tokenSold;
    uint256 public tokenPrice;
    PakoToken public pakoToken;

    event Sell(address _buyer, uint256 amount);

    constructor(
        address account,
        uint256 _tokenPrice,
        PakoToken _pakoToken
    ) {
        admin = account;
        tokenPrice = _tokenPrice;
        pakoToken = _pakoToken;
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyToken(uint256 _numOfTokens) public payable {
        require(
            msg.value == mul(_numOfTokens, tokenPrice),
            "you dont have ether"
        );
        require(
            pakoToken.balanceOf(address(this)) >= _numOfTokens,
            "not enough token in contract"
        );
        require(pakoToken.transfer(msg.sender, _numOfTokens), "reverted!");

        tokenSold += _numOfTokens;

        emit Sell(msg.sender, _numOfTokens);
    }

    function endSale() public onlyOwner {
        // require(msg.sender == admin, "only admin can end sale");
        require(pakoToken.transfer(admin, pakoToken.balanceOf(address(this))));
        //    destroy contract  either this code
          payable(admin).transfer(address(this).balance);
        //  or this code
        // selfdestruct(payable(admin));
    }
}
