// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const tokenFactory = await hre.ethers.getContractFactory('PakoToken')
  const token = await tokenFactory.deploy(
    '0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244',
    10000,
  )

  await token.deployed()

  console.log('token contract address', token.address)

  let tokenSaleFactory = await hre.ethers.getContractFactory('TokenSale')
  let tokenSale = await tokenSaleFactory.deploy(
    '0x94FC1035713F7a2DAae589EA3F7a4494650240f7',
    1000000000000000,
    token.address,
  )
  await tokenSale.deployed()
  console.log('token sale contract address', tokenSale.address)
  let transferTokenToSaleContract = await token.transfer(
    tokenSale.address,
    750000,
  )
  await transferTokenToSaleContract.wait()

  let balanceOne = await token.balanceOf(
    '0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244',
  )
  let balanceTwo = await token.balanceOf(tokenSale.address)
  let balanceThree = await token.balanceOf(
    '0x94FC1035713F7a2DAae589EA3F7a4494650240f7',
  )
  let admin = await tokenSale.admin()
  let balanceFour = await token.balanceOf(admin)

  console.log('admin', admin)
  console.log('0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244', balanceOne)
  console.log('sale contract', balanceTwo)
  console.log('0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244', balanceThree)
  console.log(admin, balanceFour)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })



//   token contract address 0x1fdD7979ac3a03B4323A77C6A2b55c875E0804A8
// token sale contract address 0xC94bb5690C53247E9bA5CF3A2E5750f2bD65c5EF
// admin 0x94FC1035713F7a2DAae589EA3F7a4494650240f7
// 0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244 BigNumber { value: "250000" }
// sale contract BigNumber { value: "750000" }
// 0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244 BigNumber { value: "0" }
// 0x94FC1035713F7a2DAae589EA3F7a4494650240f7 BigNumber { value: "0" }


// new one 


// token contract address 0xB678b41CBa79A7CfE34F0ffB49C5f955B01a85ec
// token sale contract address 0xF0b44465029eBc1201a41156dD36506C61C03bD8
// admin 0x94FC1035713F7a2DAae589EA3F7a4494650240f7
// 0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244 BigNumber { value: "9999999999999999250000" }
// sale contract BigNumber { value: "750000" }
// 0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244 BigNumber { value: "0" }
// 0x94FC1035713F7a2DAae589EA3F7a4494650240f7 BigNumber { value: "0" }