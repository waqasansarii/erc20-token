const { expect } = require('chai')
// const { ethers } = require('hardhat')

describe('Token contract', () => {
  let tokenFactory
  let token
  let account1
  let account2

  //   using beforeEach function to set global variables

  beforeEach(async () => {
    [owner,account1,account2] = await ethers.getSigners()
    tokenFactory = await ethers.getContractFactory('PakoToken')
    token = await tokenFactory.deploy(
      '0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244',
      100000
    )
    token.deployed()
  })
  describe('Deployment', () => {
    it('deploy erc20 token', async () => {
      expect(await token.totalSupply()).to.equal(100000)
      expect(await token.symbol()).to.equal('Pak')
      expect(await token.name()).to.equal('Pako Token')
    })
    it('check  owner balance', async () => {
      expect(
        await token.balanceOf('0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244'),
      ).to.equal(100000)
    })
    it('should transfer from admin to account 1', async ()=>{
      let user1Balance =await token.balanceOf(account1.address)
      console.log('account one address',account1.address)
      console.log('user one balance before transfer',user1Balance)
      // await token.transfer(account1.address , 0.0001)
      // expect(await token.balanceOf(account1.address)).to.equal(0.0001)
    })
  })
})
