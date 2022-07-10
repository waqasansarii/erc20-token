const { expect } = require("chai");
// const { ethers } = require('hardhat')

describe("sale contract", () => {
  let admin;
  let tokenContract = "0x6991473Ad072dcE2867aC823b24E29aDEcDCC6e7";
  let saleContract;
  let sale;
  let tokenPrice = 1000000000000000; // in wei (0.001 eth)
  let buyer;
  let numOfTokens = 10;

  beforeEach(async () => {
    [admin, buyer] = await ethers.getSigners();
    saleContract = await ethers.getContractFactory("TokenSale");
    sale = await saleContract.deploy(admin.address, tokenPrice, tokenContract);
    await sale.deployed;
  });
  it("deployment", async () => {
    expect(await sale.tokenPrice()).to.equal(tokenPrice);
    expect(await sale.tokenSold()).to.equal(0);
    expect(await sale.pakoToken()).to.equal(tokenContract);
  });
  it("buy token testing", async () => {
   await sale
      .buyToken(numOfTokens,{from : buyer.address , value:1})
    // expect(await )

  });
});
