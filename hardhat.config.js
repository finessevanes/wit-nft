require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.5",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten:{
      url: "https://ropsten.infura.io/v3/84c6cf11c80f4c29bec4bcde9ec9f699",
      accounts: [`0x${process.env.REACT_APP_PRIVATE_KEY}`]
    }
  }
};
