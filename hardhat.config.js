require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

let apiKey = 'f3d23695273951c7d516cd40ad3473b4850a6cd39a002d7cabf1f2359538ea59'
module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby:{
      url:'https://rinkeby.infura.io/v3/d5f87d11ec224f18a7a56d492f447ae1',
      accounts:[`${apiKey}`]
    }
  }
};
